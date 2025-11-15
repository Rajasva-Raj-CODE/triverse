"use client";

import React from "react";
import MainLayout from "@/app/dashboard/components/MainLayout";

export default function TimelapseLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
