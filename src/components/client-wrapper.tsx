"use client";
import "client-only";
import { ReactNode } from "react";
import LeadTracker from "@/components/lead-tracker";

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <>
      <LeadTracker source="Website" />
      {children}
    </>
  );
}
