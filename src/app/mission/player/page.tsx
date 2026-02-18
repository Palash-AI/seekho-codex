"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/ui/page-loader";
import { Button, Card, Chip, Progress } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { track } from "@/lib/analytics";
import { getMissionById } from "@/lib/mockData";
import { isPreviewStep } from "@/lib/state";

function formatSeconds(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function MissionPlayerPage() {
  const router = useRouter();
  const { state, hydrated, completeStep } = useAppState();
  const clickGuardRef = useRef(false);

  const mission = useMemo(() => getMissionById(state.activeMissionId), [state.activeMissionId]);

  const currentStepIndex = state.activeStepIndex;
  const currentStep = mission?.steps[currentStepIndex] ?? null;
  const isPreviewLocked = Boolean(mission && isPreviewStep(currentStepIndex) && !state.hasTrial);

  useEffect(() => {
    if (!hydrated) return;
    if (!mission) {
      router.replace("/home");
    }
  }, [hydrated, mission, router]);

  if (!hydrated || !mission || !currentStep) {
    return <PageLoader label="Opening mission player..." />;
  }

  const completedCount = state.completedSteps[mission.id] ?? 0;
  const simulatedVideoTotalSec = 300;
  const simulatedVideoCurrentSec = 134;
  const simulatedProgressPercent = Math.min(100, Math.round((simulatedVideoCurrentSec / simulatedVideoTotalSec) * 100));

  const stepTitle = `Step ${Math.min(4, currentStepIndex + 1)} of 4`;
  const topTitle = currentStepIndex <= 1 ? "Speaking Basics" : currentStepIndex === 2 ? "AI Roleplay" : "Mastery Check";
  const missionCardTitle = currentStepIndex >= 1 ? "Mission 50% Complete 🔥" : "Mission in Progress";
  const missionCardSubtitle = isPreviewLocked
    ? "Unlock full mission to continue."
    : currentStepIndex >= 1
      ? "You just earned 50 XP!"
      : "Complete this step to continue.";

  const completeCurrentStepAndTrack = () => {
    const today = new Date().toISOString().slice(0, 10);
    const willIncrementStreak = state.lastActiveDate !== today;
    const nextStreakCount = state.streakCount + (willIncrementStreak ? 1 : 0);
    const nextCompletedCount = Math.min(4, completedCount + 1);
    const missionFinished = nextCompletedCount >= mission.steps.length;

    completeStep(mission.steps.length);

    track("Step_Completed", {
      missionId: mission.id,
      stepIndex: currentStepIndex,
      completedCount: nextCompletedCount
    });

    if (willIncrementStreak) {
      track("Streak_Incremented", {
        streakCount: nextStreakCount
      });
    }

    return { missionFinished };
  };

  const handleContinue = () => {
    if (clickGuardRef.current) return;
    clickGuardRef.current = true;

    const releaseGuard = () => {
      clickGuardRef.current = false;
    };

    if (isPreviewLocked) {
      track("Preview_Viewed", {
        missionId: mission.id,
        stepIndex: currentStepIndex,
        watchSeconds: 0
      });
      track("Paywall_Shown", {
        missionId: mission.id,
        stepIndex: currentStepIndex
      });
      router.push("/mission/paywall");
      return;
    }

    if (currentStepIndex === 1 && !state.hasTrial) {
      completeCurrentStepAndTrack();
      track("Preview_Viewed", {
        missionId: mission.id,
        stepIndex: 2,
        watchSeconds: 0
      });
      track("Paywall_Shown", {
        missionId: mission.id,
        stepIndex: 2
      });
      router.push("/mission/paywall");
      return;
    }

    if (state.hasTrial && currentStepIndex >= 2) {
      const today = new Date().toISOString().slice(0, 10);
      const willIncrementStreak = state.lastActiveDate !== today;
      const nextStreakCount = state.streakCount + (willIncrementStreak ? 1 : 0);

      const nextCompletedCountA = Math.min(4, completedCount + 1);
      completeStep(mission.steps.length);
      track("Step_Completed", {
        missionId: mission.id,
        stepIndex: currentStepIndex,
        completedCount: nextCompletedCountA
      });

      if (currentStepIndex === 2) {
        const nextCompletedCountB = Math.min(4, completedCount + 2);
        completeStep(mission.steps.length);
        track("Step_Completed", {
          missionId: mission.id,
          stepIndex: 3,
          completedCount: nextCompletedCountB
        });
      }

      if (willIncrementStreak) {
        track("Streak_Incremented", {
          streakCount: nextStreakCount
        });
      }

      router.push(`/mission/complete?missionId=${mission.id}`);
      return;
    }

    const { missionFinished } = completeCurrentStepAndTrack();
    if (missionFinished) {
      router.push(`/mission/complete?missionId=${mission.id}`);
      return;
    }

    releaseGuard();
  };

  return (
    <main className="theme-dark min-h-screen bg-app font-seekho text-primary">
      <div className="mx-auto w-full max-w-seekhoShell pb-8">
        <section className="border-b border-default px-4 pb-4 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-section uppercase tracking-[0.08em] text-secondary">
                <button className="text-title text-primary" onClick={() => router.push("/mission/reveal")} type="button">
                  ‹
                </button>
                <span>{stepTitle}</span>
              </div>
              <p className="mt-1 text-cardTitle">{topTitle}</p>
            </div>
            <Chip selected withAccentBorder>
              ⚡ {mission.xp} XP
            </Chip>
          </div>
          <Progress className="mt-4" max={4} segmented segments={4} value={Math.min(4, currentStepIndex + 1)} />
        </section>

        <section className="relative">
          <img
            alt="Mission lesson"
            className="h-[240px] w-full object-cover"
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
          />
          <button className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full gradient-appBg text-[28px] text-white shadow-cta" type="button">
            ▶
          </button>
          <div className="absolute bottom-10 left-4 right-4 flex items-center justify-between text-body text-white">
            <span>{formatSeconds(simulatedVideoCurrentSec)}</span>
            <span>{formatSeconds(simulatedVideoTotalSec)}</span>
          </div>
          <Progress className="absolute bottom-4 left-4 right-4" max={100} value={simulatedProgressPercent} />
        </section>

        <section className="px-4 pt-6">
          <Card
            body={
              <>
                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-display">How to Introduce Yourself</h1>
                  <button className="text-title text-secondary" type="button">
                    🔖
                  </button>
                </div>
                <p className="mt-2 text-body text-secondary">
                  Learn the formal and informal ways to greet interviewers in this 5-minute lesson tailored for fresher interviews.
                </p>
              </>
            }
            variant="default"
          />
        </section>

        <section className="mt-4 space-y-3 px-4">
          <Card
            body={
              <>
                <div className="flex items-center justify-between">
                  <p className="text-cardTitle">Key Vocabulary</p>
                  <span className="text-secondary">⌃</span>
                </div>
                <Card
                  body={
                    <>
                      <p className="text-cardTitle">&quot;Pleased to meet you&quot;</p>
                      <p className="mt-1 text-body text-secondary">Formal greeting used in first meetings.</p>
                    </>
                  }
                  className="mt-2 bg-elevated"
                />
                <Card
                  body={
                    <>
                      <p className="text-cardTitle">&quot;I&apos;m a fresher&quot;</p>
                      <p className="mt-1 text-body text-secondary">Indicates you have recently graduated.</p>
                    </>
                  }
                  className="mt-2 bg-elevated"
                />
              </>
            }
            variant="elevated"
          />

          <Card
            body={
              <div className="flex items-center justify-between">
                <p className="text-cardTitle">Grammar Focus</p>
                <span className="text-secondary">⌄</span>
              </div>
            }
            variant="elevated"
          />
        </section>

        <section className="mt-5 px-4">
          <Card
            body={
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-cardTitle">{missionCardTitle}</p>
                  <p className="mt-1 text-body text-secondary">{missionCardSubtitle}</p>
                </div>
                <span className="rounded-seekhoChip border border-[#D3AF37] bg-[rgba(211,175,55,0.16)] px-3 py-2 text-[#D3AF37]">
                  $
                </span>
              </div>
            }
            footer={
              <Button className="mt-1 w-full" onClick={handleContinue}>
                Continue Learning English
              </Button>
            }
            variant="elevated"
          />
        </section>
      </div>
    </main>
  );
}
