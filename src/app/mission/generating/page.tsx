"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/ui/page-loader";
import { Progress } from "@/components/ui/ds";
import { useAppState } from "@/components/providers/app-provider";
import { track } from "@/lib/analytics";

const progressFrames = [0, 25, 50, 75, 100];
const copyFrames = [
  "Best videos choose ho rahe hain...",
  "Confidence roadmap set ho raha hai...",
  "Aapka path personalize ho raha hai..."
];

export default function MissionGeneratingPage() {
  const router = useRouter();
  const { state, hydrated } = useAppState();
  const [frameIndex, setFrameIndex] = useState(0);
  const trackedRef = useRef(false);

  const selectedMissionId = useMemo(() => state.selectedMissionId, [state.selectedMissionId]);

  useEffect(() => {
    if (!hydrated) return;

    if (!state.selectedMissionId || !state.selectedLevel) {
      router.replace("/mission/entry");
      return;
    }

    if (!trackedRef.current) {
      track("Mission_Generated", {
        missionId: state.selectedMissionId,
        level: state.selectedLevel
      });
      trackedRef.current = true;
    }

    setFrameIndex(0);
    let nextIndex = 0;

    const progressTimer = window.setInterval(() => {
      nextIndex += 1;
      setFrameIndex(nextIndex);

      if (nextIndex >= progressFrames.length - 1) {
        window.clearInterval(progressTimer);
        window.setTimeout(() => {
          router.push("/mission/reveal");
        }, 300);
      }
    }, 620);

    return () => {
      window.clearInterval(progressTimer);
    };
  }, [hydrated, router, state.selectedLevel, state.selectedMissionId]);

  if (!hydrated || !selectedMissionId || !state.selectedLevel) {
    return <PageLoader label="Generating your mission..." />;
  }

  const percent = progressFrames[Math.min(frameIndex, progressFrames.length - 1)];
  const copy = copyFrames[Math.min(frameIndex, copyFrames.length - 1)];

  return (
    <main className="theme-dark relative min-h-screen overflow-hidden bg-app font-seekho text-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(127,9,214,0.35),rgba(0,0,0,0.95)_65%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-seekhoShell flex-col px-6 pb-8 pt-16">
        <div className="mx-auto grid h-[220px] w-[220px] place-items-center rounded-full border border-default">
          <div className="grid h-[132px] w-[132px] place-items-center rounded-full gradient-appBg shadow-cta">
            <span className="text-[38px] text-white">✦</span>
          </div>
        </div>

        <h1 className="mt-8 text-center text-display">
          Mission personalize
          <br />
          <span className="text-[#F50ACA]">ho raha hai...</span>
        </h1>

        <p className="mt-4 text-center text-body text-secondary">{copy}</p>

        <div className="mx-auto mt-12 w-full max-w-[280px]">
          <div className="mb-2 flex items-center justify-between text-section">
            <span className="text-secondary">AI Processing</span>
            <span className="text-secondary">{percent}%</span>
          </div>
          <Progress value={percent} />
        </div>
      </div>
    </main>
  );
}
