"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/ui/page-loader";
import { BottomSheet, Button, Card } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { getMissionById } from "@/lib/mockData";
import { track } from "@/lib/analytics";

function BenefitRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Card
      body={
        <div>
          <p className="text-cardTitle">{title}</p>
          <p className="mt-1 text-body text-secondary">{subtitle}</p>
        </div>
      }
      variant="elevated"
    />
  );
}

export default function MissionPaywallPage() {
  const router = useRouter();
  const { state, hydrated, startTrial } = useAppState();
  const [startingTrial, setStartingTrial] = useState(false);

  const mission = useMemo(() => getMissionById(state.activeMissionId), [state.activeMissionId]);

  useEffect(() => {
    if (!hydrated) return;
    if (!mission) {
      router.replace("/home");
    }
  }, [hydrated, mission, router]);

  if (!hydrated || !mission) return <PageLoader label="Loading free trial..." />;

  const missionName = mission.id === "english-speaking" ? "English Mission" : `${mission.title} Mission`;

  return (
    <main className="theme-dark min-h-screen bg-app font-seekho text-primary">
      <BottomSheet onClose={() => router.push("/home")} open>
        <div className="mx-auto w-full max-w-seekhoShell">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full gradient-appBg shadow-cta">
            <span className="text-[36px]">🔒</span>
          </div>

          <h1 className="mt-5 text-center text-display">
            Continue Your
            <br />
            <span className="text-[#F50ACA]">{missionName}</span>
          </h1>

          <p className="mt-3 text-center text-body text-secondary">
            You&apos;ve completed the preview! Unlock the full experience to keep learning and reach your goal.
          </p>

          <div className="mt-6 space-y-3">
            <BenefitRow subtitle="Access all 15 lessons in this series" title="Remaining Steps" />
            <BenefitRow subtitle="Tailored practice every single day" title="Daily Missions" />
            <BenefitRow subtitle="Don&apos;t lose your 12-day streak" title="Progress Tracking" />
          </div>

          <p className="mt-4 text-center text-body text-secondary">Cancel anytime. No questions asked.</p>

          <Button
            className="mt-5 w-full"
            onClick={() => {
              if (startingTrial) return;
              setStartingTrial(true);
              startTrial();
              track("Trial_Started", { missionId: mission.id, planId: "7d_trial" });
              router.push("/mission/player");
            }}
          >
            Start 7-Day Free Trial →
          </Button>

          <Button className="mt-3 w-full" onClick={() => router.push("/home")} variant="ghost">
            Maybe Later
          </Button>
        </div>
      </BottomSheet>
    </main>
  );
}
