"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserRound, Edit2, Save, X } from "lucide-react";

export default function SuperAdminProfilePage() {
  const [profile, setProfile] = useState({
    name: "Sachin Ahlawat",
    email: "sachin@triverse.in",
    phone: "9876543210",
    role: "Super Admin",
    company: "Triverse",
  });

  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
            My Profile
          </h1>
          <p className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-1.5">
            Manage your personal information and account settings
          </p>
        </div>
      </div>

      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm max-w-3xl">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Super Admin Information</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Your account details and profile information
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editing ? tempProfile.name : profile.name}
                onChange={handleChange}
                disabled={!editing}
                className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30 disabled:opacity-60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={editing ? tempProfile.email : profile.email}
                onChange={handleChange}
                disabled={!editing}
                className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30 disabled:opacity-60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={editing ? tempProfile.phone : profile.phone}
                onChange={handleChange}
                disabled={!editing}
                className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30 disabled:opacity-60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                Company
              </Label>
              <Input
                id="company"
                value={profile.company}
                disabled
                className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white/80 dark:bg-[var(--brand-bg-primary)]/10 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] opacity-60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                Role
              </Label>
              <Input
                id="role"
                value={profile.role}
                disabled
                className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white/80 dark:bg-[var(--brand-bg-primary)]/10 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] opacity-60"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3 pt-4 border-t border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)]">
            {editing ? (
              <>
                <Button
                  onClick={handleSave}
                  className="h-10 rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 dark:hover:bg-[var(--brand-primary)]/90 transition-all duration-200 shadow-sm"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30 transition-all duration-200"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setTempProfile(profile);
                  setEditing(true);
                }}
                className="h-10 rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 dark:hover:bg-[var(--brand-primary)]/90 transition-all duration-200 shadow-sm"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
