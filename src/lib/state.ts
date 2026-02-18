import { Mission, PersistedState } from "@/lib/types";

export const APP_STATE_KEY = "seekho_app_state_v1";

export const initialAppState: PersistedState = {
  hasSeenMissionEntry: false,
  hasTrial: false,
  activeMissionId: null,
  activeStepIndex: 0,
  completedSteps: {},
  streakCount: 0,
  lastActiveDate: "",
  selectedMissionId: null,
  selectedLevel: null
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadAppState(): PersistedState {
  if (!isBrowser()) return initialAppState;

  try {
    const raw = window.localStorage.getItem(APP_STATE_KEY);
    if (!raw) return initialAppState;

    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      ...initialAppState,
      ...parsed,
      completedSteps: parsed.completedSteps ?? {}
    };
  } catch {
    return initialAppState;
  }
}

export function saveAppState(state: PersistedState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

export function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export function maybeIncrementStreak(state: PersistedState) {
  const today = getTodayIsoDate();
  if (state.lastActiveDate === today) {
    return {
      nextState: state,
      streakIncremented: false
    };
  }

  return {
    nextState: {
      ...state,
      streakCount: state.streakCount + 1,
      lastActiveDate: today
    },
    streakIncremented: true
  };
}

export function getActiveMission(state: PersistedState, missionList: Mission[]) {
  return missionList.find((mission) => mission.id === state.activeMissionId) ?? null;
}

export function getMissionProgress(state: PersistedState, missionId: string) {
  const completed = state.completedSteps[missionId] ?? 0;
  return {
    completed,
    total: 4,
    percent: Math.min(100, Math.round((completed / 4) * 100))
  };
}

export function isStepUnlocked(stepIndex: number, hasTrial: boolean) {
  if (stepIndex <= 1) return true;
  return hasTrial;
}

export function isPreviewStep(stepIndex: number) {
  return stepIndex === 2;
}
