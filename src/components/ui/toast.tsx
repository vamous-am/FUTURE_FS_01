"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

export type ToastVariant = "success" | "error";

interface ToastProps {
  message: string;
  variant: ToastVariant;
  onDismiss: () => void;
  durationMs?: number;
}

export function Toast({ message, variant, onDismiss, durationMs = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(timer);
  }, [onDismiss, durationMs]);

  const Icon = variant === "success" ? CheckCircle : AlertCircle;
  const colorClass = variant === "success" ? "text-primary-text" : "text-red-500";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex items-start gap-3 max-w-sm w-full px-4 py-3 rounded-lg bg-white/90 dark:bg-navy/90 backdrop-blur-md border border-foreground/10 shadow-md"
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${colorClass}`} aria-hidden="true" />
      <p className="text-sm text-foreground flex-1 leading-snug">{message}</p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 text-foreground/40 hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
