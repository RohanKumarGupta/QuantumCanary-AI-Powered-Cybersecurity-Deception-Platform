"use client";

import toast, { type ToastOptions } from "react-hot-toast";

// ────────── Toast Theme ──────────

const baseStyle: React.CSSProperties = {
  background: "#0D1525",
  color: "#E8EDF5",
  border: "1px solid rgba(55, 138, 221, 0.2)",
  borderRadius: "12px",
  fontSize: "14px",
  fontFamily: "'Inter', sans-serif",
  padding: "12px 16px",
};

const defaultOptions: ToastOptions = {
  duration: 4000,
  style: baseStyle,
};

// ────────── Hook ──────────

export function useToast() {
  return {
    /** Show a success toast with a green checkmark */
    success(message: string, options?: ToastOptions) {
      return toast.success(message, {
        ...defaultOptions,
        style: {
          ...baseStyle,
          borderColor: "rgba(29, 158, 117, 0.4)",
        },
        iconTheme: {
          primary: "#1D9E75",
          secondary: "#E8EDF5",
        },
        ...options,
      });
    },

    /** Show an error toast with a red X */
    error(message: string, options?: ToastOptions) {
      return toast.error(message, {
        ...defaultOptions,
        duration: 5000,
        style: {
          ...baseStyle,
          borderColor: "rgba(226, 75, 74, 0.4)",
        },
        iconTheme: {
          primary: "#E24B4A",
          secondary: "#E8EDF5",
        },
        ...options,
      });
    },

    /** Show a loading toast — returns the toast ID for dismissal */
    loading(message: string, options?: ToastOptions) {
      return toast.loading(message, {
        ...defaultOptions,
        duration: Infinity,
        ...options,
      });
    },

    /** Wrap an async operation with loading → success/error toasts */
    promise<T>(
      promiseFn: Promise<T>,
      messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((err: unknown) => string);
      },
      options?: ToastOptions
    ) {
      return toast.promise(
        promiseFn,
        {
          loading: messages.loading,
          success: messages.success,
          error: messages.error,
        },
        {
          ...defaultOptions,
          style: baseStyle,
          success: {
            style: {
              ...baseStyle,
              borderColor: "rgba(29, 158, 117, 0.4)",
            },
            iconTheme: {
              primary: "#1D9E75",
              secondary: "#E8EDF5",
            },
          },
          error: {
            style: {
              ...baseStyle,
              borderColor: "rgba(226, 75, 74, 0.4)",
            },
            iconTheme: {
              primary: "#E24B4A",
              secondary: "#E8EDF5",
            },
          },
          ...options,
        }
      );
    },

    /** Dismiss a specific toast or all toasts */
    dismiss(toastId?: string) {
      toast.dismiss(toastId);
    },

    /** Show a plain info toast (no icon) */
    info(message: string, options?: ToastOptions) {
      return toast(message, {
        ...defaultOptions,
        icon: "ℹ️",
        ...options,
      });
    },
  };
}

export default useToast;
