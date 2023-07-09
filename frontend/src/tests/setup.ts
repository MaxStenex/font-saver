import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import matchers from "@testing-library/jest-dom/matchers";
import { randomUUID } from "node:crypto";
import { zustandCreateStoreMock } from "./__mocks__/zustand";

vi.mock("zustand", async () => ({
  create: zustandCreateStoreMock,
}));

expect.extend(matchers);

Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID,
  },
});

afterEach(() => {
  cleanup();
});
