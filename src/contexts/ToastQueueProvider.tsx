import { useState, createContext, useContext, useCallback, PropsWithChildren } from "react";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const defaultProps: ToastQueueProvider = {
  position: "bottom-end",
  autohideDelay: 3000,
};

interface ToastQueueProvider {
  position: BootstrapPlacement;
  autohideDelay: number;
}

type BootstrapPlacement =
  | "top-start"
  | "top-center"
  | "top-end"
  | "middle-start"
  | "middle-center"
  | "middle-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

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
  bg?: BootstrapVariant;
}

interface ToastQueueContext {
  createToast: (toastData: Omit<ToastData, "id" | "show">) => void;
}

// context provides createToast({ title, body, autohide = true, bg = undefined }) function
const ToastQueueContext = createContext<ToastQueueContext | null>(null);

// wrap children in provider component, allowing them to use the context function
export function ToastQueueProvider(
  props: PropsWithChildren<ToastQueueProvider>,
) {
  const [queue, setQueue] = useState<Array<ToastData>>([]);
  const { children, position, autohideDelay } = {
    ...defaultProps,
    ...props,
  };

  const createToast = useCallback(function (toastData: Omit<ToastData, "id" | "show">) {
    setQueue((previousQueue: ToastData[]) => [
      ...previousQueue,
      {
        id: Date.now(),
        show: true,
        autohide: true, // this default gets overwritten if set in toastData
        ...toastData,
      },
    ]);
  }, []);

  // begins toast close animation
  function closeToast(id: ToastData["id"]) {
    setQueue((currentQueue: ToastData[]) =>
      currentQueue.map((toast) =>
        toast.id === id ? { ...toast, show: false } : toast,
      ),
    );
  }

  // removes toast from queue once close animation complete
  function removeToast(id: ToastData["id"]) {
    setQueue((currentQueue: ToastData[]) =>
      currentQueue.filter((toast) => toast.id !== id),
    );
  }

  return (
    <ToastQueueContext.Provider value={{ createToast }}>
      {children}
      <ToastContainer className="position-fixed p-3" position={position}>
        {queue.map((toast: ToastData) => (
          <Toast
            key={toast.id}
            show={toast.show}
            onClose={() => closeToast(toast.id)}
            onExited={() => removeToast(toast.id)}
            delay={autohideDelay}
            autohide={toast.autohide}
            bg={toast?.bg}
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

// context provides createToast({ title, body, autohide = true, bg = undefined }) function
ToastQueueProvider.useToastQueue = function () {
  const context = useContext(ToastQueueContext);
  if (context === null)
    throw new Error(
      "ToastQueueContext cannot be used outside of ToastQueueProvider",
    );
  return context;
};
