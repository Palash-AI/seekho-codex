import { AnalyticsEvent, AnalyticsEventName } from "@/lib/types";

const EVENT_LOG_KEY = "seekho_event_log_v1";
const listeners = new Set<() => void>();

function isBrowser() {
  return typeof window !== "undefined";
}

function readEvents(): AnalyticsEvent[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(EVENT_LOG_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AnalyticsEvent[];
  } catch {
    return [];
  }
}

function writeEvents(events: AnalyticsEvent[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(EVENT_LOG_KEY, JSON.stringify(events));
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function track(eventName: AnalyticsEventName, payload?: Record<string, unknown>) {
  const event: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    name: eventName,
    payload,
    timestamp: new Date().toISOString()
  };

  if (isBrowser()) {
    const events = readEvents();
    const nextEvents = [event, ...events].slice(0, 150);
    writeEvents(nextEvents);
    console.log("[SeekhoTrack]", eventName, payload ?? {});
    notify();
  }
}

export function getEventLog() {
  return readEvents();
}

export function clearEventLog() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(EVENT_LOG_KEY);
  notify();
}

export function subscribeEventLog(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
