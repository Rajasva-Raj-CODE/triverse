"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Users as UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Viewer" },
  { id: 3, name: "Alex Roy", email: "alex@example.com", role: "Engineer" },
  { id: 4, name: "Emily Clark", email: "emily@example.com", role: "Editor" },
  { id: 5, name: "Michael Brown", email: "michael@example.com", role: "Admin" },
  { id: 6, name: "Sarah Wilson", email: "sarah@example.com", role: "Viewer" },
  { id: 7, name: "David Miller", email: "david@example.com", role: "Engineer" },
  { id: 8, name: "Laura Davis", email: "laura@example.com", role: "Editor" },
  { id: 9, name: "Chris Taylor", email: "chris@example.com", role: "Viewer" },
  { id: 10, name: "Anna Moore", email: "anna@example.com", role: "Admin" },
  { id: 11, name: "Robert Jackson", email: "robert@example.com", role: "Engineer" },
  { id: 12, name: "Olivia White", email: "olivia@example.com", role: "Viewer" },
  { id: 13, name: "Daniel Harris", email: "daniel@example.com", role: "Editor" },
  { id: 14, name: "Sophia Martin", email: "sophia@example.com", role: "Admin" },
  { id: 15, name: "James Thompson", email: "james@example.com", role: "Engineer" },
  { id: 16, name: "Grace Lee", email: "grace@example.com", role: "Viewer" },
  { id: 17, name: "Henry Walker", email: "henry@example.com", role: "Admin" },
  { id: 18, name: "Chloe Hall", email: "chloe@example.com", role: "Editor" },
  { id: 19, name: "Ethan Allen", email: "ethan@example.com", role: "Engineer" },
  { id: 20, name: "Mia Young", email: "mia@example.com", role: "Viewer" },
];

const roles = ["Admin", "Viewer", "Engineer", "Editor"];

export default function UserTable() {
  const [users, setUsers] = useState(dummyUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRoleChange = (id: number, newRole: string) => {
    const updatedUsers = users.map((u) =>
      u.id === id ? { ...u, role: newRole } : u
    );
    setUsers(updatedUsers);
  };

  const handleRemove = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
      <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <UsersIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">User Management</CardTitle>
              <p className="text-sm text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-0.5">
                Manage users and their roles
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
            <Input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 backdrop-blur pl-10 pr-4 text-sm text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] placeholder:text-[#FF9A00]/70 dark:placeholder:text-[var(--brand-text-secondary)]/60 transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] overflow-hidden bg-white dark:bg-[var(--brand-bg-primary)]/10">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#FF9A00]/20 dark:border-[var(--brand-border-light)] bg-[var(--brand-primary)]/30 dark:bg-[var(--brand-primary)]/20 hover:bg-[#FF9A00]/30 dark:hover:bg-[var(--brand-primary)]/20">
                  <TableHead className="h-12 font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                    Name
                  </TableHead>
                  <TableHead className="h-12 font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                    Email
                  </TableHead>
                  <TableHead className="h-12 font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                    Role
                  </TableHead>
                  <TableHead className="h-12 font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-[#FF9A00]/20 dark:border-[#FF9A00]/20 transition-all duration-200 hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/10"
                    >
                      <TableCell className="font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">{user.name}</TableCell>
                      <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(value) =>
                            handleRoleChange(user.id, value)
                          }
                        >
                          <SelectTrigger className="h-9 w-32 rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 hover:border-[#FF9A00] dark:hover:border-[#FF9A00] focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30">
                            <SelectValue className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-[#4F200D]/95 border-[var(--brand-border)] dark:border-[var(--brand-border-medium)]">
                            {roles.map((role) => (
                              <SelectItem 
                                key={role} 
                                value={role}
                                className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] focus:bg-[#FF9A00]/30 dark:focus:bg-[#FF9A00]/30 cursor-pointer"
                              >
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(user.id)}
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
            Showing <span className="font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">{filteredUsers.length}</span> of{" "}
            <span className="font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">{users.length}</span> users
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
