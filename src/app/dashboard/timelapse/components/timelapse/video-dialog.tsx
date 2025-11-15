"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {Download} from "lucide-react";

interface Video {
  title: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

interface VideoDialogProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoDialog({ video, isOpen, onClose }: VideoDialogProps) {

  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {video.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Player */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              className="w-full h-[400px] object-cover"
              poster={video.thumbnail}
              controls
              preload="metadata"
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Details */}
            <div className="lg:col-span-2 space-y-4">

              <div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {video.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                    Download
                </Button>

              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}