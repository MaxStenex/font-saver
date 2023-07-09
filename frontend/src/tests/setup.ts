import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { randomUUID } from "node:crypto";

expect.extend(matchers);

Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID,
  },
});

afterEach(() => {
  cleanup();
});
