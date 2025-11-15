// components/NavbarTabs.tsx
import React from "react";

interface NavbarTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavbarTabs: React.FC<NavbarTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { label: "Default Time Lapse", value: "default" },
    { label: "components-timelapse-images Time Lapse", value: "custom" },
    { label: "Advanced Time Lapse", value: "advanced" },
  ];

  return (
    <div className="flex flex-col sm:flex-row">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`cursor-pointer flex-1 text-center py-2 border border-yellow-500 font-medium ${
            activeTab === tab.value
              ? "bg-yellow-400"
              : "bg-yellow-200 text-gray-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavbarTabs;
