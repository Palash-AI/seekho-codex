"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/components/providers/app-provider";
import { PageLoader } from "@/components/ui/page-loader";

export default function RootPage() {
  const router = useRouter();
  const { state, hydrated } = useAppState();

  useEffect(() => {
    if (!hydrated) return;

    if (!state.hasSeenMissionEntry) {
      router.replace("/mission/entry");
      return;
    }

    router.replace("/home");
  }, [hydrated, router, state.hasSeenMissionEntry]);

  return <PageLoader label="Setting up your mission..." />;
}
