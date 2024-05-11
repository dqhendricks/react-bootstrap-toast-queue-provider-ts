# react-bootstrap-toast-queue-provider-ts
This TS react component will allow you to queue multiple react-bootstrap Toast components using a simple context function. (JS version available [here](https://github.com/dqhendricks/react-bootstrap-toast-queue-provider))

*Notes: react-bootstrap package + CSS must be installed properly.*

For a working example, view the code sandbox [here](https://codesandbox.io/p/devbox/react-bootstrap-toast-queue-provider-ts-s3drrq?file=%2Fsrc%2Fcomponents%2FToastQueueProvider.tsx%3A37%2C14-37%2C31&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clvtufq4c0007356i8k6a7h61%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clvtufq4c0002356imka8nnth%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clvtufq4c0004356ikvhulna7%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clvtufq4c0006356im1nh3bdv%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B72.68329597486446%252C27.316704025135536%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clvtufq4c0002356imka8nnth%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clvtufq4b0001356ilmxnrr8z%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522id%2522%253A%2522clvtvlz2j0002356ilinf2gxc%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A77%252C%2522startColumn%2522%253A2%252C%2522endLineNumber%2522%253A77%252C%2522endColumn%2522%253A2%257D%255D%252C%2522filepath%2522%253A%2522%252Fsrc%252Fcomponents%252FToastQueueProvider.jsx%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522id%2522%253A%2522clvzhh0u10002356igom4v0op%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A10%252C%2522startColumn%2522%253A2%252C%2522endLineNumber%2522%253A10%252C%2522endColumn%2522%253A2%257D%255D%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.tsx%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522id%2522%253A%2522clw07ob4u0002356ibw2yn7ua%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A37%252C%2522startColumn%2522%253A14%252C%2522endLineNumber%2522%253A37%252C%2522endColumn%2522%253A31%257D%255D%252C%2522filepath%2522%253A%2522%252Fsrc%252Fcomponents%252FToastQueueProvider.tsx%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522id%2522%253A%2522clvtufq4c0002356imka8nnth%2522%252C%2522activeTabId%2522%253A%2522clw07ob4u0002356ibw2yn7ua%2522%257D%252C%2522clvtufq4c0006356im1nh3bdv%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clvtufq4c0005356i1g7f6k6d%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clvtufq4c0006356im1nh3bdv%2522%252C%2522activeTabId%2522%253A%2522clvtufq4c0005356i1g7f6k6d%2522%257D%252C%2522clvtufq4c0004356ikvhulna7%2522%253A%257B%2522id%2522%253A%2522clvtufq4c0004356ikvhulna7%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clvtufq4c0003356ihkzomelb%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clvtufq4c0003356ihkzomelb%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D), or see below.

**Examples usage:**

*1) Wrap any children that need to use the Toast Queue Provider*
```
import ToastQueueProvider from "./components/ToastQueueProvider.tsx";
import ExampleConsumer from "./components/ExampleConsumer.tsx";

export default function App() {
  return (
    <ToastQueueProvider>
      <ExampleConsumer />
    </ToastQueueProvider>
  );
}
```

*2) Child components may import and use context to gain access to `createToast({ title, body, autohide = true, variant = null })` function*
```
import { useContext } from "react";

import { ToastQueueContext } from "./ToastQueueProvider.tsx";

export default function ExampleConsumer() {
  const { createToast } = useContext(ToastQueueContext);

  return (
    <button
      onClick={() => createToast({ title: "Success", body: "You have queued a toast!" })}
    >
      Create New Toast
    </button>
  );
}
```
