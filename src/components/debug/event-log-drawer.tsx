"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { clearEventLog, getEventLog, subscribeEventLog } from "@/lib/analytics";
import { useAppState } from "@/components/providers/app-provider";

export function EventLogDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState(getEventLog());
  const { resetAppState } = useAppState();

  const hideTrigger =
    pathname === "/mission/entry" ||
    pathname === "/mission/level" ||
    pathname === "/mission/generating" ||
    pathname === "/mission/reveal" ||
    pathname === "/mission/player" ||
    pathname === "/mission/paywall";

  useEffect(() => {
    setEvents(getEventLog());
    const unsubscribe = subscribeEventLog(() => {
      setEvents(getEventLog());
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (hideTrigger) {
      setOpen(false);
    }
  }, [hideTrigger]);

  return (
    <>
      {!hideTrigger ? (
        <button
          className="fixed right-4 top-4 z-50 rounded-full border border-seekho-border bg-seekho-elevated px-3 py-2 text-[12px] text-seekho-text"
          onClick={() => setOpen(true)}
          type="button"
        >
          Logs ({events.length})
        </button>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/65">
          <div className="h-full w-full max-w-[360px] border-l border-seekho-border bg-seekho-surface p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[18px] font-semibold">Event Log</h3>
              <button
                className="rounded-full border border-seekho-border px-2 py-1 text-[12px] text-seekho-muted"
                onClick={() => setOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="mb-3 flex gap-2">
              <button
                className="seekho-button-secondary flex-1 py-2 text-[13px]"
                onClick={() => {
                  clearEventLog();
                  setEvents([]);
                }}
                type="button"
              >
                Clear Events
              </button>
              <button
                className="seekho-button-primary flex-1 py-2 text-[13px]"
                onClick={() => {
                  clearEventLog();
                  resetAppState();
                  setEvents([]);
                }}
                type="button"
              >
                Reset Prototype
              </button>
            </div>

            <div className="h-[calc(100%-120px)] space-y-2 overflow-y-auto pr-1">
              {events.length === 0 ? (
                <p className="caption-copy">No events yet.</p>
              ) : (
                events.map((event) => (
                  <div
                    className="rounded-button border border-seekho-border bg-seekho-elevated p-2"
                    key={event.id}
                  >
                    <p className="text-[12px] font-semibold text-seekho-text">{event.name}</p>
                    <p className="mt-1 text-[11px] text-seekho-muted">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                    {event.payload ? (
                      <pre className="mt-1 overflow-x-auto text-[10px] text-seekho-secondary">
                        {JSON.stringify(event.payload, null, 2)}
                      </pre>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
