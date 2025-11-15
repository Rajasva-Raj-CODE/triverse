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
import { Folder, Plus, Trash2, Building2, ExternalLink } from "lucide-react";

type Company = {
  id: number;
  company_name: string;
  company_address: string;
  location: string;
  pincode: string;
  company_super_adminname: string;
};

// Hardcoded sample data matching API response structure
const dummyCompanies: Company[] = [
  {
    id: 1,
    company_name: "Guidona Softpedia",
    company_address: "Noida",
    location: "https://maps.app.goo.gl/rF84E3Neh4a4xe5E8",
    pincode: "226010",
    company_super_adminname: "Vibhu Chinmay",
  },
  {
    id: 2,
    company_name: "Surya Group",
    company_address: "Mumbai",
    location: "https://maps.app.goo.gl/example1",
    pincode: "400001",
    company_super_adminname: "Rajesh Kumar",
  },
  {
    id: 3,
    company_name: "Triverse Infra",
    company_address: "Delhi",
    location: "https://maps.app.goo.gl/example2",
    pincode: "110001",
    company_super_adminname: "Priya Sharma",
  },
];

const formSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  company_address: z.string().min(1, "Company address is required"),
  location: z.string().url("Please enter a valid Google Maps URL").min(1, "Location link is required"),
  pincode: z.string().min(6, "Pincode must be at least 6 characters").max(6, "Pincode must be 6 characters"),
  company_super_adminname: z.string().min(1, "Super admin name is required"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function AddCompany() {
  const [companies, setCompanies] = useState<Company[]>(dummyCompanies);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      company_address: "",
      location: "",
      pincode: "",
      company_super_adminname: "",
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
          <h1 className="text-3xl font-bold tracking-tight text-[#4F200D] dark:text-[#F6F1E9]">
            Manage Companies
          </h1>
          <p className="text-[#FF9A00] dark:text-[#FFD93D] mt-1.5">
            Create and manage your companies
          </p>
        </div>
      </div>

      {/* Add Company Form */}
      <Card className="rounded-2xl border-[#FF9A00]/40 dark:border-[#FF9A00]/30 bg-gradient-to-br from-[#F6F1E9] to-white dark:from-[#4F200D]/50 dark:to-[#3A1809]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[#FF9A00]/30 dark:border-[#FF9A00]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF9A00] dark:bg-[#FF9A00] text-white shadow-sm">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[#4F200D] dark:text-[#F6F1E9]">Add New Company</CardTitle>
              <CardDescription className="text-[#FF9A00] dark:text-[#FFD93D]">
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
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4F200D] dark:text-[#F6F1E9]">Company Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter company name"
                        {...field}
                        className="rounded-lg border-[#FF9A00]/50 dark:border-[#FF9A00]/40 bg-white dark:bg-[#4F200D]/20 text-[#4F200D] dark:text-[#F6F1E9] transition-all duration-200 focus:border-[#FF9A00] dark:focus:border-[#FF9A00] focus:ring-2 focus:ring-[#FF9A00]/40 dark:focus:ring-[#FF9A00]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4F200D] dark:text-[#F6F1E9]">Company Address *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter company address"
                        {...field}
                        className="rounded-lg border-[#FF9A00]/50 dark:border-[#FF9A00]/40 bg-white dark:bg-[#4F200D]/20 text-[#4F200D] dark:text-[#F6F1E9] transition-all duration-200 focus:border-[#FF9A00] dark:focus:border-[#FF9A00] focus:ring-2 focus:ring-[#FF9A00]/40 dark:focus:ring-[#FF9A00]/30"
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
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-[#4F200D] dark:text-[#F6F1E9]">Location Link (Google Maps) *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://maps.app.goo.gl/..."
                        {...field}
                        className="rounded-lg border-[#FF9A00]/50 dark:border-[#FF9A00]/40 bg-white dark:bg-[#4F200D]/20 text-[#4F200D] dark:text-[#F6F1E9] transition-all duration-200 focus:border-[#FF9A00] dark:focus:border-[#FF9A00] focus:ring-2 focus:ring-[#FF9A00]/40 dark:focus:ring-[#FF9A00]/30"
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
                    <FormLabel className="text-[#4F200D] dark:text-[#F6F1E9]">Pincode *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 6-digit pincode"
                        maxLength={6}
                        {...field}
                        className="rounded-lg border-[#FF9A00]/50 dark:border-[#FF9A00]/40 bg-white dark:bg-[#4F200D]/20 text-[#4F200D] dark:text-[#F6F1E9] transition-all duration-200 focus:border-[#FF9A00] dark:focus:border-[#FF9A00] focus:ring-2 focus:ring-[#FF9A00]/40 dark:focus:ring-[#FF9A00]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_super_adminname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#4F200D] dark:text-[#F6F1E9]">Super Admin Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter super admin name"
                        {...field}
                        className="rounded-lg border-[#FF9A00]/50 dark:border-[#FF9A00]/40 bg-white dark:bg-[#4F200D]/20 text-[#4F200D] dark:text-[#F6F1E9] transition-all duration-200 focus:border-[#FF9A00] dark:focus:border-[#FF9A00] focus:ring-2 focus:ring-[#FF9A00]/40 dark:focus:ring-[#FF9A00]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="h-10 rounded-lg bg-[#FF9A00] dark:bg-[#FF9A00] text-white hover:bg-[#FF9A00]/90 dark:hover:bg-[#FF9A00]/90 transition-all duration-200 shadow-sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Company
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card className="rounded-2xl border-[#FF9A00]/40 dark:border-[#FF9A00]/30 bg-gradient-to-br from-[#F6F1E9] to-white dark:from-[#4F200D]/50 dark:to-[#3A1809]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[#FF9A00]/30 dark:border-[#FF9A00]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF9A00] dark:bg-[#FF9A00] text-white shadow-sm">
              <Folder className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[#4F200D] dark:text-[#F6F1E9]">All Companies</CardTitle>
              <CardDescription className="text-[#FF9A00] dark:text-[#FFD93D]">
                View and manage all your companies
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {companies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF9A00]/20 dark:bg-[#FF9A00]/20">
                <Building2 className="h-8 w-8 text-[#FF9A00] dark:text-[#FFD93D]" />
              </div>
              <p className="mt-4 text-sm font-medium text-[#4F200D] dark:text-[#F6F1E9]">
                No companies added yet
              </p>
              <p className="mt-1 text-xs text-[#FF9A00] dark:text-[#FFD93D]">
                Create your first company using the form above
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-[#FF9A00]/40 dark:border-[#FF9A00]/30 overflow-hidden bg-white dark:bg-[#4F200D]/10">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#FF9A00]/20 dark:border-[#FF9A00]/20 bg-[#FF9A00]/30 dark:bg-[#FF9A00]/20 hover:bg-[#FF9A00]/30 dark:hover:bg-[#FF9A00]/20">
                      <TableHead className="font-semibold text-[#4F200D] dark:text-[#F6F1E9]">Company Name</TableHead>
                      <TableHead className="font-semibold text-[#4F200D] dark:text-[#F6F1E9]">Address</TableHead>
                      <TableHead className="font-semibold text-[#4F200D] dark:text-[#F6F1E9]">Pincode</TableHead>
                      <TableHead className="font-semibold text-[#4F200D] dark:text-[#F6F1E9]">Location</TableHead>
                      <TableHead className="font-semibold text-[#4F200D] dark:text-[#F6F1E9]">Super Admin</TableHead>
                      <TableHead className="font-semibold text-[#4F200D] dark:text-[#F6F1E9] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow
                        key={company.id}
                        className="border-[#FF9A00]/20 dark:border-[#FF9A00]/20 transition-all duration-200 hover:bg-[#FF9A00]/20 dark:hover:bg-[#FF9A00]/10"
                      >
                        <TableCell className="font-medium text-[#4F200D] dark:text-[#F6F1E9]">
                          {company.company_name}
                        </TableCell>
                        <TableCell className="text-[#FF9A00] dark:text-[#FFD93D]">
                          {company.company_address}
                        </TableCell>
                        <TableCell className="text-[#FF9A00] dark:text-[#FFD93D]">
                          {company.pincode}
                        </TableCell>
                        <TableCell className="text-[#FF9A00] dark:text-[#FFD93D]">
                          <a
                            href={company.location}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                          >
                            <span className="truncate max-w-[200px]">View Location</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell className="text-[#FF9A00] dark:text-[#FFD93D]">
                          {company.company_super_adminname}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setCompanies((prev) =>
                                prev.filter((c) => c.id !== company.id)
                              )
                            }
                            className="h-8 rounded-lg text-[#FF9A00] dark:text-[#FF9A00] hover:text-[#4F200D] dark:hover:text-[#F6F1E9] hover:bg-[#FF9A00]/30 dark:hover:bg-[#FF9A00]/30 transition-all duration-200"
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
