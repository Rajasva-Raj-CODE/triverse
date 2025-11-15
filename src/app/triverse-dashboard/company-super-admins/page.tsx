"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UserPlus, Plus, Trash2, Users } from "lucide-react";

type Company = { id: number; name: string };

type SuperAdmin = {
  id: number;
  name: string;
  email: string;
  role: string;
  companyId: number;
  services: string;
};

const dummyCompanies: Company[] = [
  { id: 1, name: "Surya Group" },
  { id: 2, name: "Triverse Infra" },
  { id: 3, name: "UrbanX Buildcon" },
];

const companyOptions = dummyCompanies.map((c) => ({
  value: String(c.id),
  label: c.name,
}));

const formSchema = z.object({
  name: z.string().min(1, "Super Admin name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  services: z.string().min(1, "Services are required"),
  companyId: z.string().min(1, "Company selection is required"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CompanySuperAdminsPage() {
  const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      services: "",
      companyId: "",
    },
  });

  const getCompanyName = (id: number) =>
    dummyCompanies.find((c) => c.id === id)?.name || "N/A";

  const onSubmit = (data: FormSchema) => {
    const newAdmin: SuperAdmin = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      services: data.services,
      companyId: parseInt(data.companyId),
    };

    setSuperAdmins([newAdmin, ...superAdmins]);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
            Assign Company Super Admin
          </h1>
          <p className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-1.5">
            Create and manage company super administrators
          </p>
        </div>
      </div>

      {/* Add Super Admin Form */}
      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Create New Company Super Admin</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Assign a super admin to a company
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Select Company *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30 h-10">
                          <SelectValue placeholder="Select Company..." className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[var(--brand-bg-primary)]/95 border-[var(--brand-border)] dark:border-[var(--brand-border-medium)]">
                          {companyOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] focus:bg-[var(--brand-primary)]/30 dark:focus:bg-[var(--brand-primary)]/30 cursor-pointer"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Super Admin Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Super Admin Name"
                        {...field}
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Super Admin Role *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Super Admin Role"
                        {...field}
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Super Admin Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Super Admin Email"
                        {...field}
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Services Provided *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Services Provided"
                        {...field}
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="h-10 rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 dark:hover:bg-[var(--brand-primary)]/90 transition-all duration-200 shadow-sm"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assign Super Admin
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Super Admins Table */}
      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">All Company Super Admins</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                View and manage all company super administrators
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {superAdmins.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/20">
                <UserPlus className="h-8 w-8 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
              </div>
              <p className="mt-4 text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                No super admins assigned yet
              </p>
              <p className="mt-1 text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Assign your first super admin using the form above
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] overflow-hidden bg-white dark:bg-[var(--brand-bg-primary)]/10">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] bg-[var(--brand-primary)]/30 dark:bg-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/20">
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Name</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Email</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Role</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Company</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Services</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {superAdmins.map((s) => (
                      <TableRow
                        key={s.id}
                        className="border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] transition-all duration-200 hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/10"
                      >
                        <TableCell className="font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">{s.name}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{s.email}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{s.role}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{getCompanyName(s.companyId)}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{s.services}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setSuperAdmins((prev) =>
                                prev.filter((admin) => admin.id !== s.id)
                              )
                            }
                            className="h-8 rounded-lg text-[var(--brand-primary)] dark:text-[var(--brand-primary)] hover:text-[var(--brand-text-primary)] dark:hover:text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
