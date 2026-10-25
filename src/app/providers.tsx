"use client";
import { useRouter } from "next/navigation";
import { DesignSystemProvider, ToastRegion } from "@meetingat10/design-system/react";

/** Design system context: reduced-motion aware Motion defaults, client-side routing for its links, and the locale. */
export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <DesignSystemProvider navigate={router.push} locale="en-PH">
      {children}
      <ToastRegion />
    </DesignSystemProvider>
  );
}
