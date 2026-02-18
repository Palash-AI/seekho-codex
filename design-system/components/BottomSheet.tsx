import { ReactNode, useEffect, useState } from "react";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), 240);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 font-seekho">
      <button
        aria-label="Close sheet backdrop"
        className={`absolute inset-0 bg-[rgba(0,0,0,0.60)] transition-opacity duration-seekhoMedium ease-seekho ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        type="button"
      />
      <div
        className={`absolute bottom-0 left-1/2 w-full max-w-seekhoShell -translate-x-1/2 rounded-t-seekhoSheet bg-[#1A1A1A] px-6 pb-6 pt-3 transition-transform duration-seekhoMedium ease-seekho ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[rgba(255,255,255,0.28)]" />
        {children}
      </div>
    </div>
  );
}
