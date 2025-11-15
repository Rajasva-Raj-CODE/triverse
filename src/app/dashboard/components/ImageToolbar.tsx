// components/ImageToolbar.tsx
"use client";

import { IconMoodSmile, IconPencil, IconVideo, IconStar, IconMask } from "@tabler/icons-react";

const sidebarIcons = [
    IconMoodSmile,
    IconPencil,
    IconVideo,
    IconStar,
    IconMask
];

export default function ImageToolbar() {
    return (
        <aside className="w-16 flex-shrink-0 flex flex-col items-center py-4 gap-3 border-r border-gray-200 bg-white z-10">
            {sidebarIcons.map((Icon, idx) => (
                <div
                    key={idx}
                    className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer"
                >
                    <Icon size={20} />
                </div>
            ))}
        </aside>
    );
}
