"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

// The modal (and its form logic) only loads the first time someone asks for it.
const TestDriveModal = dynamic(() => import("@/components/test-drive/TestDriveModal"), { ssr: false });

interface TestDriveContextValue {
  open: (carSlug?: string) => void;
  close: () => void;
}

const TestDriveContext = createContext<TestDriveContextValue | null>(null);

export function TestDriveProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; car?: string; mounted: boolean }>({
    open: false,
    mounted: false,
  });

  const open = useCallback((car?: string) => setState({ open: true, car, mounted: true }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <TestDriveContext.Provider value={value}>
      {children}
      {state.mounted && <TestDriveModal open={state.open} initialCar={state.car} onClose={close} />}
    </TestDriveContext.Provider>
  );
}

export function useTestDrive() {
  const ctx = useContext(TestDriveContext);
  if (!ctx) throw new Error("useTestDrive must be used inside <TestDriveProvider>");
  return ctx;
}
