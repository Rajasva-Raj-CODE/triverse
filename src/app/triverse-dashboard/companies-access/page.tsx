"use client";

import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Building2, Plus, Trash2 } from "lucide-react";

type Company = {
  id: number;
  name: string;
  address: string;
  pincode: string;
  location: string;
  superAdmin: string;
};

const formSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Address is required"),
  pincode: z.string().min(1, "Pincode is required"),
  location: z.string().min(1, "Location is required"),
  superAdmin: z.string().min(1, "Super Admin is required"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      pincode: "",
      location: "",
      superAdmin: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    const newCompany: Company = {
      id: Date.now(),
      ...data,
    };

    setCompanies([newCompany, ...companies]);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
            Manage Companies
          </h1>
          <p className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-1.5">
            Create and manage company access
          </p>
        </div>
      </div>

      {/* Add Company Form */}
      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Create New Company</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Fill in the details to create a new company
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Company Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Company Name"
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Address *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Company Address"
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
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Pincode *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pincode"
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Location *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Location"
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
                name="superAdmin"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
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

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="h-10 rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 dark:hover:bg-[var(--brand-primary)]/90 transition-all duration-200 shadow-sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Company
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">All Companies</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                View and manage all companies
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {companies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/20">
                <Building2 className="h-8 w-8 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
              </div>
              <p className="mt-4 text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                No companies added yet
              </p>
              <p className="mt-1 text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Create your first company using the form above
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] overflow-hidden bg-white dark:bg-[var(--brand-bg-primary)]/10">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] bg-[var(--brand-primary)]/30 dark:bg-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/20">
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Name</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Address</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Pincode</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Location</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Super Admin</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((c) => (
                      <TableRow
                        key={c.id}
                        className="border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] transition-all duration-200 hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/10"
                      >
                        <TableCell className="font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">{c.name}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{c.address}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{c.pincode}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{c.location}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{c.superAdmin}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setCompanies((prev) =>
                                prev.filter((comp) => comp.id !== c.id)
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
