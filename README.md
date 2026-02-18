# Seekho 2.0 Mission Mode Prototype

Clickable, mobile-first prototype for Seekho Mission Mode built with Next.js App Router + TypeScript + Tailwind.

## How to run

Prerequisites:
- Node.js 20+
- npm 10+

Commands:
```bash
npm install
npm run dev
```

Open:
- http://localhost:3000

## What is mocked

- Missions, steps, clusters, levels: local static data in `src/lib/mockData.ts`
- Login: single mock action (`Continue with Phone`) updates local state only
- Trial: local state boolean (`hasTrial`)
- Video playback: placeholder card + simulated actions
- Preview step: 60-second countdown simulation
- Plans/pricing: static mock plan cards on paywall

## Reset first-install and all state

Two options:

1. In-app reset:
- Open `Logs` button (top-right)
- Click `Reset Prototype`

2. Manual localStorage reset:
- Remove `seekho_app_state_v1`
- Remove `seekho_event_log_v1`

This restores first-install behavior and clears analytics panel logs.

## Key routes and flow

- `/` root gate
- `/mission/entry` Mission entry takeover (A)
- `/mission/level` Level select (B)
- `/mission/generating` AI generating state (C)
- `/mission/reveal` Mission reveal (D)
- `/mission/player` Mission player + preview lock sheet (E, F)
- `/mission/paywall` Trial paywall (G)
- `/mission/complete` Mission completion (H)
- `/home` Mission-first home (I)

Primary path:
1. Mission entry -> level select -> generating -> reveal
2. Start mission (login if needed)
3. Complete step 1 and 2
4. Step 3 preview countdown (60s)
5. Lock sheet -> paywall -> start trial
6. Finish remaining steps -> mission complete
7. Choose next mission

## Persisted state model

Stored in localStorage (`seekho_app_state_v1`):
- `hasSeenMissionEntry`
- `isLoggedIn`
- `hasTrial`
- `activeMissionId`
- `activeStepIndex`
- `completedSteps`
- `streakCount`
- `lastActiveDate`
- `selectedMissionId`
- `selectedLevel`

## Analytics instrumentation

`track(eventName, payload)` is implemented in `src/lib/analytics.ts`.

Events logged to:
- Browser console
- On-screen Event Log drawer

Implemented events:
- `Mission_Selected`
- `Mission_Generated`
- `Mission_Started`
- `Step_Completed`
- `Preview_Viewed`
- `Paywall_Shown`
- `Trial_Started`
- `Mission_Completed`
- `Streak_Incremented`

## Known limitations

- No backend integration
- No real auth/session/token handling
- No real video playback/progress tracking
- No responsive tablet-specific layout tuning (optimized for mobile shell)
- Event logging is local and non-networked
