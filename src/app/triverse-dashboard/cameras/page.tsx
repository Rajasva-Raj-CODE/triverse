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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Plus, Video, Trash2 } from "lucide-react";

type Project = { id: number; name: string };

type CameraItem = {
  id: number;
  cameraId: string;
  name: string;
  projectId: number;
  floor: string;
  type: string;
  status: "active" | "inactive";
};

const dummyProjects: Project[] = [
  { id: 1, name: "Surya Tower" },
  { id: 2, name: "Triverse HQ" },
  { id: 3, name: "Green Ville Plaza" },
];

const projectOptions = dummyProjects.map((p) => ({
  value: String(p.id),
  label: p.name,
}));

const formSchema = z.object({
  cameraId: z.string().min(3, "Camera ID is required"),
  name: z.string().min(3, "Camera name is required"),
  projectId: z.string().min(1, "Project is required"),
  floor: z.string().optional(),
  type: z.string().min(1, "Camera type is required"),
  status: z.string().min(1, "Status is required"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CamerasPage() {
  const [cameras, setCameras] = useState<CameraItem[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cameraId: "",
      name: "",
      projectId: "",
      floor: "",
      type: "",
      status: "",
    },
  });

  const getProjectName = (id: number) =>
    dummyProjects.find((p) => p.id === id)?.name || "Unknown";

  const onSubmit = (data: FormSchema) => {
    const newCamera: CameraItem = {
      id: Date.now(),
      cameraId: data.cameraId || `CAM-${Date.now().toString().slice(-5)}`,
      name: data.name,
      projectId: parseInt(data.projectId),
      floor: data.floor || "",
      type: data.type,
      status: data.status as "active" | "inactive",
    };

    setCameras([newCamera, ...cameras]);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
            Manage Cameras
          </h1>
          <p className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-1.5">
            Add and manage camera installations
          </p>
        </div>
      </div>

      {/* Add Camera Form */}
      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Add Camera</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Register a new camera to your project
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
                name="cameraId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Camera ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Camera ID (auto if blank)"
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
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
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Camera Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Camera Name"
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Project *</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30 h-10">
                          <SelectValue placeholder="Select Project" className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[var(--brand-bg-primary)]/95 border-[var(--brand-border)] dark:border-[var(--brand-border-medium)]">
                          {projectOptions.map((option) => (
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
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Floor / Area</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Floor / Area"
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Camera Type *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="static / 360 / timelapse"
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Status *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="active / inactive"
                        className="rounded-lg border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/20 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-1 md:col-span-2">
                <Button
                  type="submit"
                  className="h-10 rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 dark:hover:bg-[var(--brand-primary)]/90 transition-all duration-200 shadow-sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Camera
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Cameras Table */}
      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
              <Video className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">All Cameras</CardTitle>
              <CardDescription className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                View and manage all camera installations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {cameras.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/20">
                <Camera className="h-8 w-8 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
              </div>
              <p className="mt-4 text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                No cameras added yet
              </p>
              <p className="mt-1 text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                Add your first camera using the form above
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] overflow-hidden bg-white dark:bg-[var(--brand-bg-primary)]/10">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] bg-[var(--brand-primary)]/30 dark:bg-[var(--brand-primary)]/20 hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/20">
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">ID</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Name</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Project</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Floor</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Type</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Status</TableHead>
                      <TableHead className="font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cameras.map((cam) => (
                      <TableRow
                        key={cam.id}
                        className="border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] transition-all duration-200 hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/10"
                      >
                        <TableCell className="font-mono text-sm text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                          {cam.cameraId}
                        </TableCell>
                        <TableCell className="font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">{cam.name}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{getProjectName(cam.projectId)}</TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                          {cam.floor || "—"}
                        </TableCell>
                        <TableCell className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{cam.type}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              cam.status === "active"
                                ? "bg-[var(--brand-text-secondary)]/20 dark:bg-[var(--brand-text-secondary)]/20 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]"
                                : "bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)]/30 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]"
                            }`}
                          >
                            {cam.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setCameras((prev) =>
                                prev.filter((c) => c.id !== cam.id)
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
