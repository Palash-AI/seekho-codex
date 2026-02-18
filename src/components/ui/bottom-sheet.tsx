"use client";

import { PropsWithChildren } from "react";

interface BottomSheetProps extends PropsWithChildren {
  open: boolean;
}

export function BottomSheet({ open, children }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/70">
      <div className="w-full rounded-t-sheet border-t border-seekho-border bg-seekho-elevated p-4 pb-6">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-seekho-border" />
        {children}
      </div>
    </div>
  );
}
