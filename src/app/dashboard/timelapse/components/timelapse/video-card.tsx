"use client";

import * as React from "react";
import {Dialog, DialogContent, DialogTrigger,} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, MapPin } from "lucide-react";

interface Video {
    id?: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: string;
    category: string;
    siteLocation: string;
    createdAt: string;
}

interface VideoCardProps {
    video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden rounded-xl">
                    <CardHeader className="p-0 relative h-40">
                        <div className="w-full max-w-[800px] h-[160px] bg-black flex items-center justify-center">
                            <Play className="text-white w-8 h-8" />
                        </div>

                        <div className="absolute top-2 right-2 flex gap-2">
                            <Badge variant="secondary" className="bg-black/70 text-white border-0 px-2 py-1 text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {video.duration}
                            </Badge>
                            <Badge
                                variant="secondary"
                                className={`border-0 text-white px-2 py-1 text-xs ${
                                    video.category === "default"
                                        ? "bg-blue-600"
                                        : video.category === "custom"
                                            ? "bg-green-600"
                                            : "bg-purple-600"
                                }`}
                            >
                                {video.category === "default"
                                    ? "Default"
                                    : video.category === "custom"
                                        ? "Custom"
                                        : "Advanced"}
                            </Badge>
                        </div>

                        <div className="absolute bottom-2 left-2">
                            <Badge variant="outline" className="bg-white/90 text-slate-900 border-white/50 px-2 py-1 text-xs">
                                <MapPin className="h-3 w-3 mr-1" />
                                {video.siteLocation}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 space-y-2">
                        <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {video.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {video.description}
                        </p>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                            {video.createdAt}
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>

            <DialogContent
                className="bg-black p-0 overflow-hidden rounded-xl"
                style={{
                    width: "90vw",
                    maxWidth: "800px",
                }}
            >
                <video
                    src={video.videoUrl}
                    controls
                    preload="auto"
                    className="w-full h-auto"
                />
            </DialogContent>
        </Dialog>
    );
}
