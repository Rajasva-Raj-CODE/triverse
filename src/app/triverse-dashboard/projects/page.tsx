"use client";

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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Folder, Plus, Trash2, Building2 } from "lucide-react";

type Company = {
  id: number;
  name: string;
};

type Project = {
  id: number;
  companyId: number;
  name: string;
  category: string;
  value: string;
  timeline: string;
  location: string;
  locationLink: string;
  client?: string;
  height?: string;
  contractor?: string;
};

const dummyCompanies: Company[] = [
  { id: 1, name: "Surya Group" },
  { id: 2, name: "Triverse Infra" },
  { id: 3, name: "UrbanX Buildcon" },
];

const companyOptions = dummyCompanies.map((company) => ({
  value: String(company.id),
  label: company.name,
}));

const formSchema = z.object({
  companyId: z.string().min(1, "Company is required"),
  name: z.string().min(1, "Project name is required"),
  category: z.string().min(1, "Category is required"),
  value: z.string().min(1, "Value is required"),
  timeline: z.string().min(1, "Timeline is required"),
  location: z.string().min(1, "Location is required"),
  locationLink: z.string().min(1, "Location link is required"),
  client: z.string().optional(),
  height: z.string().optional(),
  contractor: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyId: "",
      name: "",
      category: "",
      value: "",
      timeline: "",
      location: "",
      locationLink: "",
      client: "",
      height: "",
      contractor: "",
    },
  });

  const getCompanyName = (id: number) => {
    const company = dummyCompanies.find((c) => c.id === id);
    return company?.name || "N/A";
  };

  const onSubmit = (data: FormSchema) => {
    const newProject: Project = {
      id: Date.now(),
      ...data,
      companyId: parseInt(data.companyId),
    };

    setProjects([newProject, ...projects]);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
            Manage Projects
          </h1>
          <p className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-1.5">
            Create and manage your construction projects
          </p>
        </div>
      </div>

      {/* Add Project Form */}
      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Add New Project</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Fill in the details to create a new project
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
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Project Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Project Name"
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Category *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category"
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
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Value *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Value"
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
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Timeline *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Timeline"
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
                name="locationLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Location Link *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Google Maps Link"
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
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Client</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Client Name"
                        {...field}
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Height</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Height of Project"
                        {...field}
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contractor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Contractor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="General Contractor"
                        {...field}
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="h-10 rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 dark:hover:bg-[var(--brand-primary)]/90 transition-all duration-200 shadow-sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <Folder className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">All Projects</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                View and manage all your projects
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/20">
                <Building2 className="h-8 w-8 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
              </div>
              <p className="mt-4 text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                No projects added yet
              </p>
              <p className="mt-1 text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Create your first project using the form above
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] overflow-hidden bg-white dark:bg-[var(--brand-bg-primary)]/10">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] bg-[var(--brand-primary)]/30 dark:bg-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/20">
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Name</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Company</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Category</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Timeline</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Location</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((p) => (
                      <TableRow
                        key={p.id}
                        className="border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] transition-all duration-200 hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/10"
                      >
                        <TableCell className="font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">{p.name}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{getCompanyName(p.companyId)}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{p.category}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{p.timeline}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                          {p.location}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setProjects((prev) =>
                                prev.filter((proj) => proj.id !== p.id)
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
