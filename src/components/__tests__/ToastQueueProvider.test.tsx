import { useContext } from "react";
import { describe, test, expect, afterEach } from "vitest";
import {
  render,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import {
  ToastQueueProvider,
  ToastQueueContext,
} from "../ToastQueueProvider.tsx";

import type { ToastData } from "../ToastQueueProvider.tsx";

interface TestConsumerComponent {
  toastData: Omit<ToastData, "id" | "show">;
}

const sleep = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

function TestConsumerComponent({ toastData }: TestConsumerComponent) {
  const { createToast } = useContext(ToastQueueContext);
  return (
    <button
      data-testid="createToastButton"
      onClick={() => createToast(toastData)}
    ></button>
  );
}

describe("<ToastQueueProvider />", () => {
  afterEach(() => {
    cleanup();
  });

  test("ToastQueueProvider expected to render without error", () => {
    render(<ToastQueueProvider />);
  });

  // createToast() function

  test("createToast() renders basic toast.", () => {
    const { getByTestId, getByText } = render(
      <ToastQueueProvider>
        <TestConsumerComponent
          toastData={{ title: "test title", body: "test body" }}
        />
      </ToastQueueProvider>,
    );
    fireEvent.click(getByTestId("createToastButton"));
    getByText("test body");
  });

  test("createToast() sets toast autohide to true.", async () => {
    const { getByTestId, getByText } = render(
      <ToastQueueProvider autohideDelay={0}>
        <TestConsumerComponent
          toastData={{
            title: "test title",
            body: "test body",
            autohide: true,
          }}
        />
      </ToastQueueProvider>,
    );
    fireEvent.click(getByTestId("createToastButton"));
    await waitForElementToBeRemoved(() => getByText("test body"));
  });

  test("createToast() sets toast autohide to false.", async () => {
    const { getByTestId, getByText } = render(
      <ToastQueueProvider autohideDelay={0}>
        <TestConsumerComponent
          toastData={{
            title: "test title",
            body: "test body",
            autohide: false,
          }}
        />
      </ToastQueueProvider>,
    );
    fireEvent.click(getByTestId("createToastButton"));
    getByText("test body");
    await sleep(100);
    getByText("test body");
  });

  test("createToast() renders variant toast.", () => {
    const { getByTestId } = render(
      <ToastQueueProvider>
        <TestConsumerComponent
          toastData={{
            title: "test title",
            body: "test body",
            bg: "secondary",
          }}
        />
      </ToastQueueProvider>,
    );
    fireEvent.click(getByTestId("createToastButton"));
    expect(document.getElementsByClassName("bg-secondary").length).toEqual(1);
  });

  // ToastQueueProvider props

  test("ToastQueueProvider maxToasts prop", () => {
    const { getByTestId, getAllByText } = render(
      <ToastQueueProvider maxToasts={2}>
        <TestConsumerComponent
          toastData={{ title: "test title", body: "test body" }}
        />
      </ToastQueueProvider>,
    );
    const createToastButton = getByTestId("createToastButton");
    fireEvent.click(createToastButton);
    fireEvent.click(createToastButton);
    fireEvent.click(createToastButton);
    expect(getAllByText("test body").length).toEqual(2);
  });
});
