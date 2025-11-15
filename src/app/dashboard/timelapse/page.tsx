"use client";

import { useEffect, useState } from "react";
import { VideoGallery } from "@/app/dashboard/timelapse/components/timelapse/video-gallery";
import { VideoDialog } from "@/app/dashboard/timelapse/components/timelapse/video-dialog";
import { CreateTimelapseDialog } from "@/app/dashboard/timelapse/components/timelapse/create-timelapse-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "@/api/axiosInstance";
import { AxiosError } from "axios";

interface AllTimelapseVideoRequest {
  company_id: number;
  project_id: number;
  category: string;
  cam_id?: number;
}

interface TimelapseVideoResponse {
  success: boolean;
  message: string;
  count: number;
  data: Array<{
    video_id: number;
    s3_url: string;
    video_type: string;
    created_date: string;
    tbl_register_camera: {
      company_name: string;
      project_name: string;
      cam_name: string;
      is_live: boolean;
    };
  }>;
}

import type { Video } from "@/app/dashboard/timelapse/types/video";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("default");
  const [selectedCam, setSelectedCam] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createDialogType, setCreateDialogType] = useState<"custom" | "advance">("custom");
  const [videos, setVideos] = useState<Video[]>([]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    fetchVideos(value as "default" | "custom" | "advance", selectedCam);
  };

  const handleCameraChange = (value: string) => {
    setSelectedCam(value);
    fetchVideos(selectedTab as "default" | "custom" | "advance", value);
  };

  const fetchVideos = async (category: "default" | "custom" | "advance", cam_id?: string) => {
    try {
      const payload: AllTimelapseVideoRequest = {
        company_id: 2,
        project_id: 1,
        category,
        ...(cam_id && cam_id !== "all" ? { cam_id: parseInt(cam_id) } : {}),
      };
      const response = await axios.post<TimelapseVideoResponse>("s3/default_timelapse", payload);
      const transformed = response.data.data.map((video) => ({
        id: String(video.video_id),
        title: `${video.tbl_register_camera.company_name} - ${video.tbl_register_camera.project_name}`,
        description: `Camera: ${video.tbl_register_camera.cam_name} | Live: ${
            video.tbl_register_camera.is_live ? "Yes" : "No"
        }`,
        thumbnail: "/thumbnail-placeholder.jpg",
        duration: "1m",
        siteLocation: video.tbl_register_camera.cam_name,
        createdAt: new Date(video.created_date).toLocaleDateString(),
        category,
        videoUrl: video.s3_url,
      }));
      setVideos(transformed);
    } catch (error) {
      console.error("Error fetching videos:", (error as AxiosError).message);
    }
  };

  useEffect(() => {
    fetchVideos("default", "");
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="default" value={selectedTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full flex overflow-x-auto sm:grid sm:grid-cols-3 gap-2 sm:gap-0 mb-8 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 h-14 scrollbar-hide rounded-md">
              <TabsTrigger value="default" className="text-sm cursor-pointer font-medium data-[state=active]:bg-[#FDC700] data-[state=active]:text-black h-10">
                <Building2 className="h-4 w-4 mr-2" />
                Default Timelapse
              </TabsTrigger>
              <TabsTrigger value="custom" className="text-sm cursor-pointer font-medium data-[state=active]:bg-[#FDC700] data-[state=active]:text-black h-10">
                Custom Timelapse
              </TabsTrigger>
              <TabsTrigger value="advance" className="text-sm cursor-pointer font-medium data-[state=active]:bg-[#FDC700] data-[state=active]:text-black h-10">
                Advanced Timelapse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="default" className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex flex-row flex-wrap items-center justify-between">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Default Timelapse</h2>
                  <div className="flex flex-row items-center gap-2">
                    <Select onValueChange={handleCameraChange}>
                      <SelectTrigger className="bg-[#FDC700] text-black font-semibold rounded-md px-4 py-2 shadow-sm border border-yellow-300 sm:w-[160px] w-[110px] hover:bg-[#e6b900]">
                        <SelectValue placeholder="Select Camera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Cam 1</SelectItem>
                        <SelectItem value="2">Cam 2</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <VideoGallery videos={videos.filter((v) => v.category === "default")} onVideoSelect={(video) => {
                setSelectedVideo(video);
                setIsDialogOpen(true);
              }} />
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex flex-row flex-wrap items-center justify-between">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Custom Timelapse</h2>
                  <div className="flex flex-row items-center gap-2">
                    <Select onValueChange={handleCameraChange}>
                      <SelectTrigger className="bg-[#FDC700] text-black font-semibold rounded-md px-4 py-2 shadow-sm border border-yellow-300 sm:w-[160px] w-[110px] hover:bg-[#e6b900]">
                        <SelectValue placeholder="Select Camera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Cam 1</SelectItem>
                        <SelectItem value="2">Cam 2</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => {
                      setCreateDialogType("custom");
                      setIsCreateDialogOpen(true);
                    }} className="bg-[#FDC700] hover:bg-[#e6b900] text-black font-semibold">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Custom Timelapse
                    </Button>
                  </div>
                </div>
              </div>
              <VideoGallery videos={videos.filter((v) => v.category === "custom")} onVideoSelect={(video) => {
                setSelectedVideo(video);
                setIsDialogOpen(true);
              }} />
            </TabsContent>

            <TabsContent value="advance" className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex flex-row flex-wrap items-center justify-between">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Advanced Timelapse</h2>
                  <div className="flex flex-row items-center gap-2">
                    <Select onValueChange={handleCameraChange}>
                      <SelectTrigger className="bg-[#FDC700] text-black font-semibold rounded-md px-4 py-2 shadow-sm border border-yellow-300 sm:w-[160px] w-[110px] hover:bg-[#e6b900]">
                        <SelectValue placeholder="Select Camera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Cam 1</SelectItem>
                        <SelectItem value="2">Cam 2</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => {
                      setCreateDialogType("advance");
                      setIsCreateDialogOpen(true);
                    }} className="bg-[#FDC700] hover:bg-[#e6b900] text-black font-semibold">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Advanced Timelapse
                    </Button>
                  </div>
                </div>
              </div>
              <VideoGallery videos={videos.filter((v) => v.category === "advance")} onVideoSelect={(video) => {
                setSelectedVideo(video);
                setIsDialogOpen(true);
              }} />
            </TabsContent>
          </Tabs>

          <VideoDialog video={selectedVideo} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
          <CreateTimelapseDialog type={createDialogType} isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />
        </div>
      </div>
  );
}