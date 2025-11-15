"use client";
import React from "react";
import { IconShare3 } from "@tabler/icons-react";

const DefaultLapse = () => (
  <div className="flex h-full">
    <div className="relative w-full h-full">
      <video controls className="w-full h-full object-cover" src="/Images/video.mp4" />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <div className="w-10 h-10 rounded-full bg-fuchsia-400 flex items-center justify-center text-white cursor-pointer shadow-lg">
          <IconShare3 size={20} />
        </div>
      </div>
    </div>
  </div>
);

export default DefaultLapse;
