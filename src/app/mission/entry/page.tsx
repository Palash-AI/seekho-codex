"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { PageLoader } from "@/components/ui/page-loader";
import { Button, Card } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { track } from "@/lib/analytics";

export const dynamic = "force-dynamic";

type EntryOption = {
  missionId: string;
  title: string;
  subtitle: string;
  icon: string;
  mostChosen?: boolean;
};

const entryOptions: EntryOption[] = [
  {
    missionId: "english-speaking",
    title: "English Speaking",
    subtitle: "Fluent bano 30 days mein",
    icon: "🌐",
    mostChosen: true
  },
  {
    missionId: "crack-interview",
    title: "Career Growth",
    subtitle: "Promotion aur salary hike",
    icon: "💼"
  },
  {
    missionId: "sales-mastery",
    title: "Stock Market",
    subtitle: "Trading seekho zero se",
    icon: "📈"
  },
  {
    missionId: "ai-tools-job",
    title: "Tech Skills",
    subtitle: "Coding aur AI tools",
    icon: "⌨"
  }
];

export default function MissionEntryPage() {
  const router = useRouter();
  const { state, hydrated, setMissionSelection } = useAppState();
  const [pendingReset, setPendingReset] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState("english-speaking");

  const selectedOption = useMemo(
    () => entryOptions.find((option) => option.missionId === selectedMissionId) ?? entryOptions[0],
    [selectedMissionId]
  );

  useEffect(() => {
    const prefill = new URLSearchParams(window.location.search).get("prefill");
    if (!prefill) return;
    if (!entryOptions.some((option) => option.missionId === prefill)) return;
    setSelectedMissionId(prefill);
  }, []);

  if (!hydrated) return <PageLoader label="Loading mission options..." />;

  const proceed = (reset = false) => {
    setMissionSelection(selectedOption.missionId, reset);
    track("Mission_Selected", { missionId: selectedOption.missionId });
    router.push("/mission/level");
  };

  return (
    <main className="theme-dark min-h-screen bg-app px-4 py-6 font-seekho text-primary">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-seekhoShell flex-col">
        <h1 className="text-display">Choose your goal</h1>
        <p className="mt-1 text-body text-secondary">Select a mission to start your journey</p>

        <div className="mt-6 space-y-3">
          {entryOptions.map((option) => {
            const active = option.missionId === selectedMissionId;
            return (
              <button className="w-full text-left" key={option.missionId} onClick={() => setSelectedMissionId(option.missionId)} type="button">
                <Card
                  body={
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-elevated text-section">
                        {option.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-cardTitle">{option.title}</p>
                        <p className="mt-1 text-body text-secondary">{option.subtitle}</p>
                      </div>
                      {option.mostChosen ? (
                        <span className={`rounded-seekhoChip px-2 py-1 text-caption font-semibold ${active ? "gradient-appBg text-white" : "bg-elevated text-muted"}`}>
                          MOST CHOSEN
                        </span>
                      ) : null}
                    </div>
                  }
                  className={active ? "border-[#F50ACA] shadow-cta" : ""}
                  variant={active ? "elevated" : "default"}
                />
              </button>
            );
          })}
        </div>

        <Button
          className="mt-auto w-full"
          onClick={() => {
            if (state.activeMissionId && state.activeMissionId !== selectedOption.missionId) {
              setPendingReset(true);
              return;
            }
            proceed();
          }}
        >
          Continue
        </Button>
      </div>

      <Modal
        onClose={() => setPendingReset(false)}
        open={pendingReset}
        title="Mission change se progress reset ho jayega"
      >
        <p className="body-copy">Naya mission start karne par current mission progress remove ho jayegi.</p>
        <div className="mt-4 flex gap-2">
          <Button className="flex-1" onClick={() => setPendingReset(false)} variant="ghost">
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              proceed(true);
              setPendingReset(false);
            }}
          >
            Reset & Continue
          </Button>
        </div>
      </Modal>
    </main>
  );
}
