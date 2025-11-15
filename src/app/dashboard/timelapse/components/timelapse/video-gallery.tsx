"use client";

import { Video } from "@/app/dashboard/timelapse/types/video";
import { VideoCard } from "./video-card";

interface VideoGalleryProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export function VideoGallery({ videos, onVideoSelect }: VideoGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
        />
      ))}
    </div>
  );
}