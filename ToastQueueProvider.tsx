import { useState, createContext } from "react";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const DEFAULT_DURATION = 3000;
const MAX_TOASTS = 10;

interface ToastQueueProvider {
  children: React.ReactNode;
}

// color variants accepted by react-bootstrap/Toast
type BootstrapVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface ToastData {
  id: number;
  show: boolean;
  title: string;
  body: string;
  autohide?: boolean;
  variant?: BootstrapVariant;
}

interface ToastQueueContext {
  createToast: (toastData: Omit<ToastData, "id" | "show">) => void;
}

// context provides createToast({ title, body, autohide = true, variant = null }) function
export const ToastQueueContext = createContext<ToastQueueContext>({
  createToast: () => {
    throw new Error(
      "createToast can only be used inside <ToastQueueContext.Provider>",
    );
  },
});

// wrap children in provider component, allowing them to use the context function
export function ToastQueueProvider({ children }: ToastQueueProvider) {
  const [queue, setQueue] = useState<Array<ToastData>>([]);

  function createToast(toastData: Omit<ToastData, "id" | "show">) {
    if (queue.length >= MAX_TOASTS) return;
    setQueue((previousQueue: ToastData[]) => [
      ...previousQueue,
      {
        id: Date.now(),
        show: true,
        autohide: true, // this default gets overwritten if set in toastData
        ...toastData,
      },
    ]);
  }

  // begins toast close animation
  function closeToast(id: number) {
    setQueue((currentQueue: ToastData[]) =>
      currentQueue.map((toast) =>
        toast.id === id ? { ...toast, show: false } : toast,
      ),
    );
  }

  // removes toast from queue once close animation complete
  function removeToast(id: number) {
    setQueue((currentQueue: ToastData[]) =>
      currentQueue.filter((toast) => toast.id !== id),
    );
  }

  return (
    <ToastQueueContext.Provider value={{ createToast }}>
      {children}
      <ToastContainer className="p-3" position="bottom-end">
        {queue.map((toast: ToastData) => (
          <Toast
            key={toast.id}
            show={toast.show}
            onClose={() => closeToast(toast.id)}
            onExited={() => removeToast(toast.id)}
            delay={DEFAULT_DURATION}
            autohide={toast.autohide}
            bg={toast?.variant}
          >
            <Toast.Header>
              <strong className="me-auto">{toast.title}</strong>
            </Toast.Header>
            <Toast.Body>{toast.body}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastQueueContext.Provider>
  );
}
