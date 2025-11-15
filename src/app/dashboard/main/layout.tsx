"use client";

import MainLayout from "@/app/dashboard/components/MainLayout";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainLayout showFilters={false}>
            {children}
        </MainLayout>
        );
}
