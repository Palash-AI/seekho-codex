"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "@/components/ui/mobile-shell";
import { PageLoader } from "@/components/ui/page-loader";
import { Button, Card, Chip } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { getMissionById } from "@/lib/mockData";
import { track } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export default function MissionCompletePage() {
  const router = useRouter();
  const [completedMissionId, setCompletedMissionId] = useState<string | null>(null);
  const { state, hydrated, completeMission } = useAppState();
  const processedRef = useRef(false);

  const mission = useMemo(
    () => getMissionById(completedMissionId ?? state.selectedMissionId),
    [completedMissionId, state.selectedMissionId]
  );

  useEffect(() => {
    const missionId = new URLSearchParams(window.location.search).get("missionId");
    setCompletedMissionId(missionId);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!mission) router.replace("/mission/entry");
  }, [hydrated, mission, router]);

  useEffect(() => {
    if (!hydrated || !mission || processedRef.current) return;
    if (state.activeMissionId !== mission.id) {
      processedRef.current = true;
      return;
    }

    track("Mission_Completed", { missionId: mission.id });
    completeMission(mission.id);
    processedRef.current = true;
  }, [completeMission, hydrated, mission, state.activeMissionId]);

  if (!hydrated || !mission) return <PageLoader label="Loading celebration..." />;

  const badgeLabel = mission.id === "english-speaking" ? "English Starter" : "Mission Starter";

  return (
    <MobileShell>
      <div className="theme-dark flex min-h-screen flex-col justify-center px-4 py-8 font-seekho text-primary">
        <Card
          body={
            <div className="text-center">
              <p className="text-display text-[#F50ACA]">Congrats</p>
              <h1 className="mt-2 text-display">Mission Complete</h1>
              <p className="mt-2 text-body text-secondary">Great consistency. Aaj ka confidence level upgrade ho gaya.</p>
              <div className="mt-4 flex justify-center">
                <Chip selected withAccentBorder>
                  {badgeLabel} badge unlocked
                </Chip>
              </div>
            </div>
          }
          footer={
            <div className="mt-2 space-y-3">
              <Button className="w-full" onClick={() => router.push("/mission/entry?prefill=english-speaking")}>
                Continue English Path
              </Button>
              <Button className="w-full" onClick={() => router.push("/home")} variant="secondary">
                Choose Next Mission
              </Button>
            </div>
          }
          variant="elevated"
        />
      </div>
    </MobileShell>
  );
}
