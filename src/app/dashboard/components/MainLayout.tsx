"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconSettings, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { handleLogout } from "../components/logout";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showFilters?: boolean;
}

export default function MainLayout({
                                     children,
                                     showFilters = true
                                   }: MainLayoutProps) {
  const router = useRouter();

  const [showSettingsSidebar, setShowSettingsSidebar] = useState(false);
  const [activeSetting, setActiveSetting] = useState<string | null>(null);

  const settingsItems = [
    "Update Project Status",
    "Update Password",
    "Manage Users",
    "Camera Status",
    "Two Factor Authentication",
    "Billing",
    "Support",
    "Email Notifications"
  ];

  const handleSettingClick = (item: string) => {
    setActiveSetting(item === activeSetting ? null : item);
  };

  const routes: Record<string, string> = {
    timelapse: "/dashboard/timelapse",
    compare: "/dashboard/compare",
    media_upload: "/dashboard/media-upload",
    report: "/dashboard/report"
  };

  return (
      <div className="bg-white text-black flex flex-col">
        {/* Header */}
        <header className="bg-yellow-400 px-4 py-2 flex items-center justify-between border-b border-gray-300 shadow-sm">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/images/trilogo.jpg" alt="Logo" width={32} height={32} />
            <Link href="/dashboard/main">
              <span className="font-bold text-xl">TRIVERSE</span>
            </Link>
          </div>

          {/* Filters */}
          {showFilters && (
              <div className="flex items-center gap-3 ml-auto">
                {/* Mobile: Select */}
                <div className="block sm:hidden">
                  <Select
                      onValueChange={(value) => {
                        if (routes[value]) router.push(routes[value]);
                      }}
                  >
                    <SelectTrigger className="bg-[#FDC700] text-black font-semibold w-[160px] rounded-md h-9">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(routes).map(([value, ]) => (
                          <SelectItem
                              key={value}
                              value={value}
                              className="hover:bg-[#FDC700] hover:text-black"
                          >
                            {value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Desktop/Tablet: Buttons */}
                <div className="hidden sm:flex gap-2">
                  {Object.entries(routes).map(([value, path]) => (
                      <button
                          key={value}
                          onClick={() => router.push(path)}
                          className="bg-[#FDC700] cursor-pointer hover:bg-[#e6b900] text-black px-4 py-2 rounded-md font-semibold text-sm transition"
                      >
                        {value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </button>
                  ))}
                </div>
              </div>
          )}

          {/* Settings Icon */}
          <Button
              onClick={() => setShowSettingsSidebar(!showSettingsSidebar)}
              className="ml-4 p-2 rounded-full bg-black hover:bg-gray-800"
          >
            <IconSettings size={22} className="text-white" />
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 ">{children}</main>

        {/* Settings Sidebar */}
        <div
            className={`fixed inset-y-0 right-0 w-80 bg-white z-30 shadow-lg transform transition-transform duration-300 ${
                showSettingsSidebar ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Settings</h2>
            <button
                onClick={() => setShowSettingsSidebar(false)}
                className="p-1 rounded-full hover:bg-gray-100"
            >
              <IconX size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {settingsItems.map((item) => (
                  <li key={item}>
                    <button
                        onClick={() => handleSettingClick(item)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${
                            activeSetting === item ? "bg-gray-100 font-medium" : ""
                        }`}
                    >
                      {item}
                    </button>
                    {activeSetting === item && item === "Update Password" && (
                        <div className="px-4 py-3 bg-gray-50 border-t border-b border-gray-200">
                          <h3 className="font-bold mb-3">Update Password</h3>
                          <div className="space-y-2">
                            <input
                                type="password"
                                placeholder="Old Password"
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                className="w-full px-3 py-2 border rounded"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full px-3 py-2 border rounded"
                            />
                          </div>
                          <div className="flex justify-end mt-4 gap-2">
                            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                              Cancel
                            </button>
                            <button className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500">
                              Save
                            </button>
                          </div>
                        </div>
                    )}
                  </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t">
            <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
  );
}
