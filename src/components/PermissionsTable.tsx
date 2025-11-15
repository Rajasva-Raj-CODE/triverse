"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Shield, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Permission = {
  id: number;
  key: string;
  description: string;
};

const initialPermissions: Permission[] = [
  { id: 1, key: "view_users", description: "Can view user list" },
  { id: 2, key: "edit_users", description: "Can edit and delete users" },
  { id: 3, key: "create_project", description: "Can create new projects" },
  { id: 4, key: "manage_cameras", description: "Can manage camera settings" },
  { id: 5, key: "view_reports", description: "Can view analytics and reports" },
];

export default function PermissionsTable() {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);
  const [key, setKey] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = () => {
    if (!key.trim() || !desc.trim()) return;
    const newPerm: Permission = {
      id: Date.now(),
      key: key.trim(),
      description: desc.trim(),
    };
    setPermissions([...permissions, newPerm]);
    setKey("");
    setDesc("");
  };

  const handleRemove = (id: number) => {
    setPermissions(permissions.filter((p) => p.id !== id));
  };

  return (
    <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
      <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
              Permissions Management
            </CardTitle>
            <p className="text-sm text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-0.5">
              Create and manage system permissions
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Add Permission Form */}
        <div className="mb-6 rounded-xl border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/10 p-4">
          <h3 className="mb-4 text-sm font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
            Add New Permission
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto]">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Permission Key
              </label>
              <Input
                placeholder="e.g. view_dashboard"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && key.trim() && desc.trim()) {
                    handleAdd();
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Description
              </label>
              <Input
                placeholder="Permission description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="h-10 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && key.trim() && desc.trim()) {
                    handleAdd();
                  }
                }}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleAdd}
                disabled={!key.trim() || !desc.trim()}
                className="h-10 w-full rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 dark:hover:bg-[var(--brand-primary)]/90 transition-all duration-200 disabled:opacity-50 shadow-sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Permissions Table */}
        <div className="rounded-xl border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] overflow-hidden bg-white dark:bg-[var(--brand-bg-primary)]/10">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#FF9A00]/20 dark:border-[#FF9A00]/20 bg-[var(--brand-primary)]/30 dark:bg-[var(--brand-primary)]/20 hover:bg-[#FF9A00]/30 dark:hover:bg-[#FF9A00]/20">
                  <TableHead className="h-12 font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                    Permission Key
                  </TableHead>
                  <TableHead className="h-12 font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                    Description
                  </TableHead>
                  <TableHead className="h-12 font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-24 text-center text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]"
                    >
                      No permissions added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  permissions.map((permission) => (
                    <TableRow
                      key={permission.id}
                      className="border-[#FF9A00]/20 dark:border-[#FF9A00]/20 transition-all duration-200 hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/10"
                    >
                      <TableCell>
                        <code className="rounded-md bg-[var(--brand-primary)]/30 dark:bg-[var(--brand-primary)]/20 px-2 py-1 text-xs font-mono text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)]">
                          {permission.key}
                        </code>
                      </TableCell>
                      <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                        {permission.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(permission.id)}
                          className="h-8 rounded-lg text-[#FF9A00] dark:text-[#FF9A00] hover:text-[var(--brand-text-primary)] dark:hover:text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 flex items-center justify-between rounded-lg border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/10 px-4 py-3">
          <p className="text-sm text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
            Total <span className="font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">{permissions.length}</span> permissions
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
