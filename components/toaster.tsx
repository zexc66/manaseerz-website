'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

let toastId = 0;
const toastListeners: Set<(toast: Toast) => void> = new Set();

export function showToast(toast: Omit<Toast, 'id'>) {
  const id = `toast-${toastId++}`;
  const newToast = { ...toast, id };

  toastListeners.forEach((listener) => listener(newToast));

  if (toast.duration !== 0) {
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  }

  return id;
}

export function removeToast(id: string) {
  // Toast dismissal is handled by the Toaster component's local state.
  // This stub is kept as part of the public API; the id is intentionally unused.
  void id;
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
    };

    toastListeners.add(listener);

    return () => {
      toastListeners.delete(listener);
    };
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-[1070] flex flex-col gap-2 max-w-md w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "p-4 rounded-xl border shadow-lg flex items-start gap-3",
              toast.type === 'success' && "bg-green-500/10 border-green-500/20",
              toast.type === 'error' && "bg-red-500/10 border-red-500/20",
              toast.type === 'info' && "bg-blue-500/10 border-blue-500/20"
            )}
          >
            <div className={cn(
              "flex-shrink-0",
              toast.type === 'success' && "text-green-400",
              toast.type === 'error' && "text-red-400",
              toast.type === 'info' && "text-blue-400"
            )}>
              {toast.type === 'success' && <CheckCircle className="h-5 w-5" />}
              {toast.type === 'error' && <AlertCircle className="h-5 w-5" />}
              {toast.type === 'info' && <Info className="h-5 w-5" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className={cn(
                "font-semibold",
                toast.type === 'success' && "text-green-400",
                toast.type === 'error' && "text-red-400",
                toast.type === 'info' && "text-blue-400"
              )}>
                {toast.title}
              </h4>
              {toast.message && (
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="flex-shrink-0 p-1 hover:bg-[var(--color-surface-800)] rounded transition-colors"
            >
              <X className="h-4 w-4 text-[var(--color-text-muted)]" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Convenience functions
export const toast = {
  success: (title: string, message?: string, duration?: number) =>
    showToast({ type: 'success', title, message, duration }),
  error: (title: string, message?: string, duration?: number) =>
    showToast({ type: 'error', title, message, duration }),
  info: (title: string, message?: string, duration?: number) =>
    showToast({ type: 'info', title, message, duration }),
};