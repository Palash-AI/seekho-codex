"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/ui/mobile-shell";
import { PageLoader } from "@/components/ui/page-loader";
import { Button, Card, Chip, Input } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { getMissionById } from "@/lib/mockData";
import { getMissionProgress } from "@/lib/state";
import { track } from "@/lib/analytics";

function SearchIcon() {
  return (
    <svg fill="none" height="16" viewBox="0 0 24 24" width="16">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-4-4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function GoalIcon() {
  return (
    <svg fill="none" height="16" viewBox="0 0 24 24" width="16">
      <circle cx="12" cy="12" fill="rgba(211,175,55,0.2)" r="10" />
      <path d="M7 6h10l-2.6 4L17 14H7l2.5-4L7 6Z" fill="#D3AF37" />
      <path d="M12 14v4" stroke="#D3AF37" strokeWidth="2" />
    </svg>
  );
}

function StreakIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path
        d="M12 2c1.6 2 2.2 3.7 1.8 5.5 2.7.4 5 2.8 5 5.8 0 4-3 7.2-6.8 7.2S5 17.3 5 13.3c0-2.6 1.4-4.7 3.5-5.9.1 1.8.8 3.1 2.1 4.1.5-2.3.7-5.3 1.4-9.5Z"
        fill="#F50ACA"
      />
      <path
        d="M12 11.1c1.4 1.1 2.1 2.3 2.1 3.7 0 1.6-1.2 2.9-2.7 2.9s-2.7-1.3-2.7-2.9c0-1.1.6-2.1 1.7-2.9.4.8.9 1.3 1.6 1.9Z"
        fill="rgba(255,255,255,0.82)"
      />
    </svg>
  );
}

function SeekhoAICoachBar({ percent }: { percent: number }) {
  const clamped = Math.max(8, Math.min(92, percent));
  return (
    <div className="relative mt-3">
      <div className="h-2 rounded-full bg-[rgba(255,255,255,0.12)]" />
      <div
        className="absolute left-0 top-0 h-2 rounded-full gradient-appBg"
        style={{ width: `${clamped}%` }}
      />
      <span
        className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-white/70 bg-[#7F09D6]"
        style={{ left: `calc(${clamped}% - 7px)` }}
      />
      <span className="absolute -right-1 -top-[5px]">
        <GoalIcon />
      </span>
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
  const aiCoachPercent = activeMission ? progress.percent : missionForHome ? 74 : 36;

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
                <div className="flex items-start justify-between gap-3">
                  <div className="mb-1 inline-flex w-fit items-center rounded-seekhoChip border border-[#7F09D6] bg-[rgba(127,9,214,0.18)] px-2 py-1 text-caption font-semibold text-[#F50ACA]">
                    SEEKHO AI COACH
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="mt-[1px]">
                      <StreakIcon />
                    </span>
                    <div className="text-right leading-none">
                      <p className="text-[11px] text-secondary">Learning Streak</p>
                      <p className="mt-[2px]">
                        <span className="text-[16px] font-semibold text-[#F50ACA]">{Math.max(0, state.streakCount)}</span>
                        <span className="ml-1 text-[16px] font-semibold text-secondary">days</span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-1 text-cardTitle">{missionForHome?.title ?? "Aaj ka Mission"}</p>
                <p className="mt-1 text-body text-secondary">{missionMeta}</p>
                <SeekhoAICoachBar percent={aiCoachPercent} />
              </>
            }
            footer={
              <div className="mt-2 grid grid-cols-[1fr_1.22fr] gap-3">
                <Button
                  className="w-full whitespace-nowrap px-3 text-[13px]"
                  onClick={() => {
                    track("AI_Practice_Clicked", {
                      missionId: missionForHome?.id ?? null,
                      source: "home_ai_coach"
                    });
                    router.push("/mission/entry?prefill=english-speaking");
                  }}
                  size="sm"
                  variant="secondary"
                >
                  Practice English
                </Button>
                <Button
                  className="w-full whitespace-nowrap px-3 text-[13px]"
                  onClick={() => {
                    track("AI_LearnNew_Clicked", {
                      missionId: missionForHome?.id ?? null,
                      source: "home_ai_coach"
                    });
                    router.push("/mission/entry?excludeCurrent=1");
                  }}
                  size="sm"
                  variant="primary"
                >
                  Learn New Skill
                </Button>
              </div>
            }
            className="border-[rgba(127,9,214,0.4)] bg-[radial-gradient(circle_at_85%_5%,rgba(245,10,202,0.22),rgba(17,17,17,0.98)_45%)]"
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
