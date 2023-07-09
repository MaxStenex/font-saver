import { act } from "@testing-library/react";
import * as zustand from "zustand";
import { type StateCreator } from "zustand";

const { create: actualCreate } = await vi.importActual<typeof zustand>("zustand");

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set<() => void>();

export const zustandCreateStoreMock = <S>(createState: StateCreator<S>) => {
  return typeof createState === "function"
    ? createInternalFn(createState)
    : createInternalFn;
};

const createInternalFn = <S>(createState: StateCreator<S>) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
