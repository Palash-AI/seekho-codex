"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/ui/page-loader";
import { Button, Card, Chip, Progress } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { getMissionById } from "@/lib/mockData";
import { track } from "@/lib/analytics";

const englishStepUI = [
  {
    title: "Step 1: The Basics of Greetings",
    subtitle: "Video Lesson",
    tag: "Free",
    locked: false,
    icon: "▶"
  },
  {
    title: "Step 2: Common Mistakes",
    subtitle: "Quick Quiz",
    tag: "Free",
    locked: false,
    icon: "?"
  },
  {
    title: "Step 3: AI Speaking Roleplay",
    subtitle: "PREVIEW LOCKED",
    tag: "",
    locked: true,
    icon: "🔒"
  },
  {
    title: "Step 4: Mastery Check",
    subtitle: "Locked",
    tag: "",
    locked: true,
    icon: "🔒"
  }
];

export default function MissionRevealPage() {
  const router = useRouter();
  const { state, hydrated, startMission } = useAppState();

  const mission = useMemo(() => getMissionById(state.selectedMissionId), [state.selectedMissionId]);

  useEffect(() => {
    if (!hydrated) return;
    if (!mission) {
      router.replace("/mission/entry");
    }
  }, [hydrated, mission, router]);

  if (!hydrated || !mission) return <PageLoader label="Loading mission reveal..." />;

  const startFlow = () => {
    startMission();
    track("Mission_Started", {
      missionId: mission.id,
      level: state.selectedLevel
    });
    router.push("/mission/player");
  };

  return (
    <main className="theme-dark min-h-screen bg-app font-seekho text-primary">
      <div className="mx-auto w-full max-w-seekhoShell pb-36 pt-6">
        <div className="flex items-center justify-between px-4">
          <button className="text-title" onClick={() => router.push("/mission/entry")} type="button">
            ←
          </button>
          <div className="flex items-center gap-4 text-title text-secondary">
            <span>↗</span>
            <span>▯</span>
          </div>
        </div>

        <section className="mt-4 px-4">
          <Card
            body={
              <div className="relative overflow-hidden rounded-seekhoCard">
                <img
                  alt="Speak confident english"
                  className="h-[220px] w-full object-cover"
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Chip selected withAccentBorder>
                    SPEAKING
                  </Chip>
                  <h1 className="mt-3 text-cardTitle">Speak Confident English</h1>
                  <p className="mt-1 text-body text-secondary">Master the art of small talk and first interactions.</p>
                </div>
              </div>
            }
            variant="elevated"
          />
        </section>

        <section className="mt-5 px-4">
          <Card
            body={
              <div className="flex items-center justify-between text-body text-secondary">
                <span>15 Minutes</span>
                <span>70 XP</span>
                <span>12k Learners</span>
              </div>
            }
          />
        </section>

        <section className="mt-5 px-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-title">Mission Progress</h2>
            <p className="text-title text-secondary">0/4 Steps</p>
          </div>
          <Progress value={0} />
        </section>

        <section className="mt-6 space-y-3 px-4">
          {englishStepUI.map((step, index) => {
            const locked = step.locked;
            return (
              <Card
                body={
                  <div className="flex items-center gap-3">
                    <div className={`grid h-12 w-12 place-items-center rounded-seekhoInput ${locked ? "bg-elevated text-muted" : "gradient-appBg text-white"}`}>
                      {step.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-cardTitle ${locked ? "text-muted" : "text-primary"}`}>{step.title}</p>
                      {locked && index === 2 ? (
                        <Chip className="mt-1" selected withAccentBorder>
                          PREVIEW LOCKED
                        </Chip>
                      ) : (
                        <p className="mt-1 text-body text-secondary">{step.tag ? `${step.tag} • ${step.subtitle}` : step.subtitle}</p>
                      )}
                    </div>
                    {!locked ? <span className="text-title text-secondary">›</span> : null}
                  </div>
                }
                key={step.title}
                variant={locked ? "default" : "elevated"}
              />
            );
          })}
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-default bg-app p-4">
        <div className="mx-auto w-full max-w-seekhoShell">
          <Button className="w-full" onClick={startFlow}>
            Start Mission
          </Button>
        </div>
      </div>
    </main>
  );
}
