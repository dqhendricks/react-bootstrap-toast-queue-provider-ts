# react-bootstrap-toast-queue-provider-ts
This TS react component will allow you to queue multiple react-bootstrap Toast components using a simple context function. The reason I made this as a Context Provider is due to the fact that all react-bootstrap Toasts need to be contained within a single react-bootstrap ToastContainer component, no matter where they are used in the application. (JS version available [here](https://github.com/dqhendricks/react-bootstrap-toast-queue-provider))

*Notes: react-bootstrap package + CSS must be installed properly.*

For a working example, view the code sandbox [here](https://codesandbox.io/p/devbox/react-bootstrap-toast-queue-provider-ts-s3drrq), or see below.

**Example usage:**

*1) Wrap any children that need to use the Toast Queue Provider. Available props { postion, autohideDelay }.*
```
import ToastQueueProvider from "./contexts/ToastQueueProvider.tsx";
import ExampleConsumer from "./components/ExampleConsumer.tsx";

export default function App() {
  return (
    <ToastQueueProvider>
      <ExampleConsumer />
    </ToastQueueProvider>
  );
}
```

*2) Child components may import and use context to gain access to `createToast({ title, body, autohide = true, bg = undefined })` function*
```
import { ToastQueueProvider } from "../contexts/ToastQueueProvider.tsx";

export default function ExampleConsumer() {
  const { createToast } = ToastQueueProvider.useToastQueue();

  return (
    <button
      onClick={() => createToast({ title: "Success", body: "You have queued a toast!" })}
    >
      Create New Toast
    </button>
  );
}
```
