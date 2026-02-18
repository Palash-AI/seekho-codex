"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/ui/mobile-shell";
import { PageLoader } from "@/components/ui/page-loader";
import { Button, Card, Chip, Input, Progress } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { getMissionById } from "@/lib/mockData";
import { getMissionProgress } from "@/lib/state";

function SearchIcon() {
  return (
    <svg fill="none" height="16" viewBox="0 0 24 24" width="16">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-4-4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function StreakBars({ count }: { count: number }) {
  const clamped = Math.max(0, Math.min(7, count));
  return (
    <div className="flex items-end gap-1">
      {Array.from({ length: 7 }).map((_, index) => {
        const isFilled = index < clamped;
        const isCurrent = index === clamped - 1 && isFilled;
        return (
          <span
            className="h-8 w-[6px] rounded-full"
            key={index}
            style={{
              background: isCurrent ? "#F50ACA" : isFilled ? "#7F09D6" : "rgba(255,255,255,0.16)"
            }}
          />
        );
      })}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { state, hydrated } = useAppState();

  const activeMission = useMemo(() => getMissionById(state.activeMissionId), [state.activeMissionId]);
  const selectedMission = useMemo(() => getMissionById(state.selectedMissionId), [state.selectedMissionId]);
  const missionForHome = activeMission ?? selectedMission;

  useEffect(() => {
    if (!hydrated) return;
    if (!state.hasSeenMissionEntry) {
      router.replace("/mission/entry");
    }
  }, [hydrated, router, state.hasSeenMissionEntry]);

  if (!hydrated) return <PageLoader label="Loading home..." />;
  if (!state.hasSeenMissionEntry) return <PageLoader label="Opening mission entry..." />;

  const progress = missionForHome
    ? getMissionProgress(state, missionForHome.id)
    : { completed: 0, total: 4, percent: 0 };

  const missionMeta = activeMission
    ? `${progress.completed}/${progress.total} done • ${missionForHome?.xp ?? 0} XP • ${missionForHome?.durationMin ?? 0} min`
    : missionForHome
      ? `Mission done • ${missionForHome.xp} XP • ${missionForHome.durationMin} min`
      : "Plan set karo aur progress start karo";

  return (
    <MobileShell>
      <div className="theme-dark px-4 pb-28 pt-8 font-seekho text-primary">
        <header>
          <h1 className="text-display">Mission Mode</h1>
          <p className="mt-1 text-body text-secondary">Micro-learning that moves with your goals.</p>
          <Input containerClassName="mt-4" leftIcon={<SearchIcon />} placeholder="Search" type="search" />
        </header>

        <section className="mt-6">
          <Card
            body={
              <>
                <p className="text-caption uppercase tracking-wide text-secondary">
                  {activeMission ? "Active Mission" : "Last Mission"}
                </p>
                <p className="mt-1 text-cardTitle">{missionForHome?.title ?? "Aaj ka Mission"}</p>
                <p className="mt-1 text-body text-secondary">{missionMeta}</p>
                <Progress className="mt-3" value={progress.percent} />
              </>
            }
            footer={
              <Button
                className="mt-1 w-full"
                onClick={() => router.push(activeMission ? "/mission/player" : "/mission/entry")}
              >
                {activeMission ? "Continue Mission" : "Choose Next Mission"}
              </Button>
            }
            variant="elevated"
          />
        </section>

        <section className="mt-6">
          <Card
            body={
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-cardTitle">{Math.max(0, state.streakCount)} Day Streak</p>
                  <p className="mt-1 text-body text-secondary">You&apos;re on fire! Keep the chain going.</p>
                </div>
                <StreakBars count={state.streakCount} />
              </div>
            }
          />
        </section>

        <section className="mt-6">
          <Card
            body={
              <>
                <p className="text-cardTitle">Stuck? Ask your Saathi</p>
                <p className="mt-1 text-body text-secondary">
                  Get instant help with your doubts or practice speaking in a safe space.
                </p>
              </>
            }
            footer={
              <div className="mt-1 grid grid-cols-2 gap-3">
                <Button size="sm" variant="secondary">
                  Practice Speaking
                </Button>
                <Button size="sm" variant="ghost">
                  Ask a Doubt
                </Button>
              </div>
            }
            variant="elevated"
          />
        </section>

        <section className="mt-6">
          <p className="section-title">Trending</p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {["English Boost", "Interview Wins", "Sales Scripts", "AI Workflows"].map((item) => (
              <Card body={<p className="text-body text-secondary">{item}</p>} className="min-w-[150px]" key={item} />
            ))}
          </div>
        </section>

        <section className="mt-6">
          <p className="section-title">Categories</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Career", "Communication", "AI", "Freelance", "Money"].map((chip, index) => (
              <Chip key={chip} selected={index === 0} withAccentBorder={index === 0}>
                {chip}
              </Chip>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <p className="section-title">Discover</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                body={
                  <>
                    <div className="h-20 rounded-seekhoInput bg-elevated" />
                    <p className="mt-2 text-body text-secondary">Video placeholder</p>
                  </>
                }
                key={index}
              />
            ))}
          </div>
        </section>
      </div>

      <Button
        className="fixed bottom-4 right-4 z-40"
        onClick={() => router.push("/mission/entry")}
        size="sm"
        variant="primary"
      >
        Make My Plan
      </Button>
    </MobileShell>
  );
}
