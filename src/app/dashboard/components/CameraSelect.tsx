// components/CameraSelect.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

export default function CameraSelect() {
    const router = useRouter();
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="flex items-center gap-3">
            <Select>
                <SelectTrigger className="bg-white w-[120px]">
                    <SelectValue placeholder="Cam 1" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="cam1">Cam 1</SelectItem>
                    <SelectItem value="cam2">Cam 2</SelectItem>
                    <SelectItem value="cam3">Cam 3</SelectItem>
                </SelectContent>
            </Select>

            <Select
                onValueChange={(value) => {
                    const routes: Record<string, string> = {
                        timelapse: "/components-timelapse-images",
                        compare: "/compare",
                        media_upload: "/media-upload",
                        report: "/report"
                    };
                    if (routes[value]) router.push(routes[value]);
                }}
            >
                <SelectTrigger className="bg-white w-[120px]">
                    <SelectValue placeholder="Select Option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="timelapse">Timelapse</SelectItem>
                    <SelectItem value="compare">Compare</SelectItem>
                    <SelectItem value="media_upload">Media Upload</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                </SelectContent>
            </Select>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-9 h-9 p-0">
                        <CalendarIcon className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
