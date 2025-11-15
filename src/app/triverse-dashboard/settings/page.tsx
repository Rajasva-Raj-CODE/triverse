"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Save, Bell, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Triverse Technologies",
    email: "admin@triverse.in",
    notifications: true,
    autoUpdates: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    console.log("Saved settings:", settings);
    // In a real app, you would save to backend here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
            System Settings
          </h1>
          <p className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-1.5">
            Manage your system configuration and preferences
          </p>
        </div>
      </div>

      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">General Settings</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Configure your company and system preferences
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
              Company Name
            </Label>
            <Input
              id="companyName"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
              Admin Email
            </Label>
            <Input
              id="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="Enter contact email"
              type="email"
              className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
                <Bell className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-sm font-medium cursor-pointer text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                  Enable Notifications
                </Label>
                <p className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                  Receive email and in-app notifications
                </p>
              </div>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={() => handleToggle("notifications")}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="autoUpdates" className="text-sm font-medium cursor-pointer text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                  Auto Updates
                </Label>
                <p className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                  Automatically install system updates
                </p>
              </div>
            </div>
            <Switch
              id="autoUpdates"
              checked={settings.autoUpdates}
              onCheckedChange={() => handleToggle("autoUpdates")}
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)]">
            <Button
              onClick={handleSave}
              className="h-10 rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 dark:hover:bg-[var(--brand-primary)]/90 transition-all duration-200 shadow-sm"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
