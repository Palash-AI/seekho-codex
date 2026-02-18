"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { LevelType, PersistedState } from "@/lib/types";
import { initialAppState, loadAppState, maybeIncrementStreak, saveAppState } from "@/lib/state";

interface AppContextValue {
  state: PersistedState;
  hydrated: boolean;
  setMissionSelection: (missionId: string, resetActiveIfDifferent?: boolean) => void;
  setLevel: (level: LevelType) => void;
  markMissionEntrySeen: () => void;
  startMission: () => void;
  setActiveStepIndex: (stepIndex: number) => void;
  completeStep: (totalSteps: number) => void;
  startTrial: () => void;
  completeMission: (missionId: string) => void;
  resetAppState: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<PersistedState>(initialAppState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadAppState();
    setState(loaded);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveAppState(state);
  }, [hydrated, state]);

  const setMissionSelection = useCallback(
    (missionId: string, resetActiveIfDifferent = false) => {
      setState((prev) => {
        if (
          resetActiveIfDifferent &&
          prev.activeMissionId &&
          prev.activeMissionId !== missionId
        ) {
          const nextCompleted = { ...prev.completedSteps };
          delete nextCompleted[prev.activeMissionId];

          return {
            ...prev,
            selectedMissionId: missionId,
            activeMissionId: null,
            activeStepIndex: 0,
            completedSteps: nextCompleted
          };
        }

        return {
          ...prev,
          selectedMissionId: missionId
        };
      });
    },
    []
  );

  const setLevel = useCallback((level: LevelType) => {
    setState((prev) => ({ ...prev, selectedLevel: level }));
  }, []);

  const markMissionEntrySeen = useCallback(() => {
    setState((prev) => ({ ...prev, hasSeenMissionEntry: true }));
  }, []);

  const startMission = useCallback(() => {
    setState((prev) => {
      if (!prev.selectedMissionId) return prev;

      const doneCount = prev.completedSteps[prev.selectedMissionId] ?? 0;
      const normalizedDoneCount = doneCount >= 4 ? 0 : doneCount;
      const nextCompletedSteps =
        doneCount >= 4
          ? {
              ...prev.completedSteps,
              [prev.selectedMissionId]: 0
            }
          : prev.completedSteps;

      return {
        ...prev,
        hasSeenMissionEntry: true,
        completedSteps: nextCompletedSteps,
        activeMissionId: prev.selectedMissionId,
        activeStepIndex: Math.min(3, normalizedDoneCount)
      };
    });
  }, []);

  const setActiveStepIndex = useCallback((stepIndex: number) => {
    setState((prev) => ({ ...prev, activeStepIndex: stepIndex }));
  }, []);

  const completeStep = useCallback((totalSteps: number) => {
    setState((prev) => {
      if (!prev.activeMissionId) return prev;

      const currentCount = prev.completedSteps[prev.activeMissionId] ?? 0;
      const nextCount = Math.min(totalSteps, currentCount + 1);
      const nextStepIndex = Math.min(totalSteps - 1, nextCount);

      const streakResult = maybeIncrementStreak(prev);

      return {
        ...streakResult.nextState,
        completedSteps: {
          ...streakResult.nextState.completedSteps,
          [prev.activeMissionId]: nextCount
        },
        activeStepIndex: nextStepIndex
      };
    });
  }, []);

  const startTrial = useCallback(() => {
    setState((prev) => ({ ...prev, hasTrial: true }));
  }, []);

  const completeMission = useCallback((missionId: string) => {
    setState((prev) => {
      return {
        ...prev,
        activeMissionId: null,
        activeStepIndex: 0,
        selectedMissionId: missionId
      };
    });
  }, []);

  const resetAppState = useCallback(() => {
    setState(initialAppState);
  }, []);

  const value = useMemo(
    () => ({
      state,
      hydrated,
      setMissionSelection,
      setLevel,
      markMissionEntrySeen,
      startMission,
      setActiveStepIndex,
      completeStep,
      startTrial,
      completeMission,
      resetAppState
    }),
    [
      state,
      hydrated,
      setMissionSelection,
      setLevel,
      markMissionEntrySeen,
      startMission,
      setActiveStepIndex,
      completeStep,
      startTrial,
      completeMission,
      resetAppState
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return ctx;
}
