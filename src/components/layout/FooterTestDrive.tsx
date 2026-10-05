"use client";

import { Button } from "@/components/ui/Button";
import { useTestDrive } from "@/components/providers/TestDriveProvider";

export function FooterTestDrive() {
  const { open } = useTestDrive();
  return (
    <Button variant="outline" size="md" onClick={() => open()}>
      Request a test drive
    </Button>
  );
}
