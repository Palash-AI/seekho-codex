"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/ui/page-loader";
import { Button, Card } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { LevelType } from "@/lib/types";

const levelCards: Array<{ id: LevelType; title: string; subtitle: string }> = [
  {
    id: "BEGINNER",
    title: "Absolute Beginner",
    subtitle: "Mujhe English bilkul nahi aati"
  },
  {
    id: "INTERMEDIATE",
    title: "Intermediate",
    subtitle: "Thoda samajh leta hu, bolne mein dikkat hai"
  },
  {
    id: "ADVANCED",
    title: "Advanced",
    subtitle: "Fluent hu, vocabulary improve karni hai"
  }
];

export default function MissionLevelPage() {
  const router = useRouter();
  const { state, hydrated, setLevel } = useAppState();
  const [selectedLevel, setSelectedLevel] = useState<LevelType>(state.selectedLevel ?? "INTERMEDIATE");

  useEffect(() => {
    if (!hydrated) return;
    if (!state.selectedMissionId) {
      router.replace("/mission/entry");
    }
  }, [hydrated, router, state.selectedMissionId]);

  if (!hydrated || !state.selectedMissionId) {
    return <PageLoader label="Preparing your level options..." />;
  }

  return (
    <main className="theme-dark min-h-screen bg-app px-4 py-6 font-seekho text-primary">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-seekhoShell flex-col">
        <button className="mb-6 w-fit text-title text-primary" onClick={() => router.push("/mission/entry")} type="button">
          ←
        </button>

        <h1 className="text-display">What&apos;s your current level?</h1>
        <p className="mt-1 text-body text-secondary">Hum aapke liye personalized plan banayenge</p>

        <div className="mt-6 space-y-3">
          {levelCards.map((level) => {
            const active = selectedLevel === level.id;
            return (
              <button className="w-full text-left" key={level.id} onClick={() => setSelectedLevel(level.id)} type="button">
                <Card
                  body={
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-cardTitle">{level.title}</p>
                        <p className="mt-1 text-body text-secondary">{level.subtitle}</p>
                      </div>
                      <span className={`grid h-8 w-8 place-items-center rounded-full border ${active ? "border-[#F50ACA]" : "border-default"}`}>
                        {active ? <span className="h-3 w-3 rounded-full bg-[#F50ACA]" /> : null}
                      </span>
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
            setLevel(selectedLevel);
            router.push("/mission/generating");
          }}
        >
          Create Plan
        </Button>
      </div>
    </main>
  );
}
