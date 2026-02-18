"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { PageLoader } from "@/components/ui/page-loader";
import { Button, Card, Input } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { track } from "@/lib/analytics";

export const dynamic = "force-dynamic";

type EntryOption = {
  missionId: string;
  title: string;
  subtitle: string;
  icon: "briefcase" | "market" | "tech" | "english";
  mostChosen?: boolean;
};

const entryOptions: EntryOption[] = [
  {
    missionId: "english-speaking",
    title: "English Speaking",
    subtitle: "Fluent bano 30 days mein",
    icon: "english",
    mostChosen: true
  },
  {
    missionId: "crack-interview",
    title: "Career Growth",
    subtitle: "Promotion aur salary hike",
    icon: "briefcase"
  },
  {
    missionId: "sales-mastery",
    title: "Stock Market",
    subtitle: "Trading seekho zero se",
    icon: "market"
  },
  {
    missionId: "ai-tools-job",
    title: "Tech Skills",
    subtitle: "Coding aur AI tools",
    icon: "tech"
  }
];

function OptionIcon({ icon, active }: { icon: EntryOption["icon"]; active: boolean }) {
  const color = active ? "#F50ACA" : "rgba(255,255,255,0.78)";

  if (icon === "briefcase") {
    return (
      <svg fill="none" height="26" viewBox="0 0 24 24" width="26">
        <rect height="11" rx="2.2" stroke={color} strokeWidth="2.2" width="16" x="4" y="8" />
        <path d="M9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke={color} strokeWidth="2.2" />
        <path d="M4 12h16" stroke={color} strokeWidth="2.2" />
      </svg>
    );
  }

  if (icon === "market") {
    return (
      <svg fill="none" height="26" viewBox="0 0 24 24" width="26">
        <path d="M4 16l5-5 4 4 7-7" stroke={color} strokeLinecap="round" strokeWidth="2.4" />
        <path d="M15 8h5v5" stroke={color} strokeLinecap="round" strokeWidth="2.4" />
      </svg>
    );
  }

  if (icon === "tech") {
    return (
      <svg fill="none" height="26" viewBox="0 0 24 24" width="26">
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" stroke={color} strokeLinecap="round" strokeWidth="2.4" />
      </svg>
    );
  }

  return (
    <svg fill="none" height="26" viewBox="0 0 24 24" width="26">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2.2" />
      <path d="M3 12h18" stroke={color} strokeWidth="2.2" />
      <path d="M12 3c2.7 2.8 2.7 15.2 0 18" stroke={color} strokeWidth="2.2" />
      <path d="M12 3c-2.7 2.8-2.7 15.2 0 18" stroke={color} strokeWidth="2.2" />
    </svg>
  );
}

export default function MissionEntryPage() {
  const router = useRouter();
  const { state, hydrated, setMissionSelection } = useAppState();
  const [pendingReset, setPendingReset] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState("english-speaking");
  const [prefillMissionId, setPrefillMissionId] = useState<string | null>(null);
  const [excludeCurrent, setExcludeCurrent] = useState(false);
  const [customSkill, setCustomSkill] = useState("");

  const visibleOptions = useMemo(() => {
    if (!excludeCurrent || !state.selectedMissionId) return entryOptions;
    const filtered = entryOptions.filter((option) => option.missionId !== state.selectedMissionId);
    return filtered.length > 0 ? filtered : entryOptions;
  }, [excludeCurrent, state.selectedMissionId]);

  const selectedOption = useMemo(
    () =>
      visibleOptions.find((option) => option.missionId === selectedMissionId) ??
      visibleOptions[0] ??
      entryOptions[0],
    [selectedMissionId, visibleOptions]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get("prefill");
    const shouldExcludeCurrent = params.get("excludeCurrent") === "1";
    setExcludeCurrent(shouldExcludeCurrent);
    setPrefillMissionId(prefill);
  }, []);

  useEffect(() => {
    if (!visibleOptions.some((option) => option.missionId === selectedMissionId)) {
      setSelectedMissionId(visibleOptions[0]?.missionId ?? "english-speaking");
    }
  }, [selectedMissionId, visibleOptions]);

  useEffect(() => {
    if (!prefillMissionId) return;
    if (!visibleOptions.some((option) => option.missionId === prefillMissionId)) return;
    setSelectedMissionId(prefillMissionId);
  }, [prefillMissionId, visibleOptions]);

  if (!hydrated) return <PageLoader label="Loading mission options..." />;

  const proceed = (reset = false) => {
    setMissionSelection(selectedOption.missionId, reset);
    track("Mission_Selected", {
      missionId: selectedOption.missionId,
      customSkill: customSkill.trim() || null
    });
    router.push("/mission/level");
  };

  return (
    <main className="theme-dark min-h-screen bg-app px-4 py-6 font-seekho text-primary">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-seekhoShell flex-col">
        <h1 className="text-display">Choose your goal</h1>
        <p className="mt-1 text-body text-secondary">Select a mission to start your journey</p>

        <div className="mt-6 space-y-3">
          {visibleOptions.map((option) => {
            const active = option.missionId === selectedMissionId;
            return (
              <button className="w-full text-left" key={option.missionId} onClick={() => setSelectedMissionId(option.missionId)} type="button">
                <Card
                  body={
                    <div className="flex items-center gap-3">
                      <div className={`grid h-14 w-14 place-items-center rounded-full border ${active ? "border-[#F50ACA]/55 bg-[rgba(245,10,202,0.14)] shadow-cta" : "border-default bg-elevated"}`}>
                        <OptionIcon active={active} icon={option.icon} />
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

        {excludeCurrent ? (
          <section className="mt-4">
            <Card
              body={
                <>
                  <p className="text-cardTitle">Or tell Seekho AI what you want to learn</p>
                  <p className="mt-1 text-body text-secondary">
                    Type any skill and we&apos;ll curate a personalized learning experience.
                  </p>
                  <Input
                    containerClassName="mt-3"
                    onChange={(event) => setCustomSkill(event.target.value)}
                    placeholder="e.g. Public speaking, Negotiation, IELTS"
                    type="text"
                    value={customSkill}
                  />
                </>
              }
              className="border-[rgba(127,9,214,0.38)] bg-[radial-gradient(circle_at_90%_8%,rgba(245,10,202,0.18),rgba(17,17,17,0.98)_40%)]"
              variant="elevated"
            />
          </section>
        ) : null}

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
