"use client";
import React from "react";

type TabType = "default" | "custom" | "advanced";

type TabsHeaderProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { label: string; value: TabType }[] = [
    { label: "Default Time Lapse", value: "default" },
    { label: "Custom-timelapse-images Time Lapse", value: "custom" },
    { label: "Advanced Time Lapse", value: "advanced" },
  ];

  return (
    <div className="flex w-full">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`w-1/3 py-3 text-sm font-semibold border-r border-yellow-500 last:border-r-0 transition-colors ${
            activeTab === tab.value
              ? "bg-yellow-500 text-black"
              : "bg-yellow-200 text-gray-600 hover:bg-yellow-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsHeader;
