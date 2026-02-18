"use client";

import { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose?: () => void;
  title: string;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <div className="w-full max-w-[420px] rounded-sheet border border-seekho-border bg-seekho-elevated p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-[18px] font-semibold text-seekho-text">{title}</h3>
          {onClose ? (
            <button
              className="text-seekho-muted transition hover:text-seekho-text"
              onClick={onClose}
              type="button"
            >
              X
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
