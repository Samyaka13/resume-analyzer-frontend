import * as React from "react";
import * as Sonner from "sonner";

type ToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  type?: "default" | "success" | "error" | "loading";
};

function buildMessage(title?: React.ReactNode, description?: React.ReactNode, action?: React.ReactNode) {
  // Return a plain string message (avoid JSX in .ts file). Sonner accepts strings or React nodes.
  const parts: string[] = [];
  if (title) parts.push(String(title));
  if (description) parts.push(String(description));
  if (action) parts.push(String(action));
  return parts.join(" \n");
}

export function toast({ title, description, action, duration, type }: ToastOptions) {
  const message = buildMessage(title, description, action);
  // Sonner's API shape can vary across versions; cast to any to avoid strict assumptions
  const id = (Sonner as any).toast ? (Sonner as any).toast(message, { duration, type }) : (Sonner as any)(message, { duration, type });

  const dismiss = (toastId?: string) => {
    if ((Sonner as any).dismiss) return (Sonner as any).dismiss(toastId ?? id);
    if ((Sonner as any).toast?.dismiss) return (Sonner as any).toast.dismiss(toastId ?? id);
    return undefined;
  };

  const update = (_opts: Partial<ToastOptions>) => {
    // Sonner doesn't expose a generic `update` in all versions; no-op for now.
    return undefined;
  };

  return { id, dismiss, update };
}

export function useToast() {
  // Sonner manages its own state internally; hook simply exposes the wrapper methods
  return {
    toast,
    dismiss: (id?: string) => {
      if ((Sonner as any).dismiss) (Sonner as any).dismiss(id);
      else if ((Sonner as any).toast?.dismiss) (Sonner as any).toast.dismiss(id);
    },
  };
}

export default useToast;
