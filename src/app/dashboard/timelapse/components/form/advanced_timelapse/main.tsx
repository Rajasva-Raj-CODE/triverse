"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OneTimeForm from "@/app/dashboard/timelapse/components/form/advanced_timelapse/one_time";
import RecurringForm from "@/app/dashboard/timelapse/components/form/advanced_timelapse/recurring";
import ProjectForm from "@/app/dashboard/timelapse/components/form/advanced_timelapse/project";

export default function AdvanceLapseForms() {
    return (
        <div className="w-full">

            <div className={'flex flex-row text-[25px] font-bold items-center justify-center'}>
                Create Advanced Timelapse
            </div>

            <Tabs defaultValue="one_time" className="mt-5 w-full">
                <div className="relative w-full">
                    <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <TabsList className="flex w-full">
                            <TabsTrigger
                                value="one_time"
                                className="flex-1 data-[state=active]:bg-[#FDC700] data-[state=active]:text-black"
                            >
                                One Time
                            </TabsTrigger>

                            <TabsTrigger
                                value="recurring"
                                className="flex-1 data-[state=active]:bg-[#FDC700] data-[state=active]:text-black"
                            >
                                Recurring
                            </TabsTrigger>

                            <TabsTrigger
                                value="project"
                                className="flex-1 data-[state=active]:bg-[#FDC700] data-[state=active]:text-black"
                            >
                                Project
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                {/* Tabs Content */}
                <TabsContent value="one_time">
                    <OneTimeForm />
                </TabsContent>
                <TabsContent value="recurring">
                    <RecurringForm />
                </TabsContent>
                <TabsContent value="project">
                    <ProjectForm />
                </TabsContent>
            </Tabs>
    </div>
    );
}
