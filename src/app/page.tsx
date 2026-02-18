"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/ui/page-loader";
import { APP_STATE_KEY } from "@/lib/state";

type StoredState = {
  hasSeenMissionEntry?: boolean;
};

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(APP_STATE_KEY);
      if (!raw) {
        router.replace("/mission/entry");
        return;
      }

      const parsed = JSON.parse(raw) as StoredState;
      router.replace(parsed.hasSeenMissionEntry ? "/home" : "/mission/entry");
    } catch {
      router.replace("/mission/entry");
    }
  }, [router]);

  return <PageLoader label="Setting up your mission..." />;
}
