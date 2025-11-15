"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Camera,
  VideoIcon,
  RotateCcw,
  Eye,
  MapPin,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AllProjects, Project } from "@/app/dashboard/main/api/project";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@/components/ui/select";

const cameraFeatures = [
  { icon: Camera, title: "Time Lapse", href: "/dashboard/timelapse" },
  { icon: VideoIcon, title: "360° View", href: "/dashboard/360-view" },
  { icon: RotateCcw, title: "Virtual Tour", href: "/dashboard/virtual-tour" },
  { icon: Eye, title: "Live Feed", href: "/dashboard/timelapse-images" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "Ongoing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Planning":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const PAGE_SIZE = 6;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await AllProjects({
        searchText: "India",
        companyId: 15,
        limit: 100,
        skip: 0,
      });
      const data = res.data;
      setProjects(data);
      setFilteredProjects(data);

      const statuses = Array.from(new Set(data.map((p) => p.status)));
      const cities = Array.from(new Set(data.map((p) => p.location)));
      setStatusOptions(["All", ...statuses]);
      setCityOptions(["All", ...cities]);
    } catch (err) {
      console.error("Error fetching projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...projects];
    if (selectedStatus !== "All") {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }
    if (selectedCity !== "All") {
      filtered = filtered.filter((p) => p.location === selectedCity);
    }
    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [selectedStatus, selectedCity, projects]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3)
      return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  }, [currentPage, totalPages]);

  return (
      <div className="h-full overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Project Dashboard</h1>
            <div className="flex flex-row gap-2 items-center">
              {/* Status Dropdown */}
              <Select onValueChange={(value) => setSelectedStatus(value)} defaultValue="All">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {statusOptions.map((status, i) => (
                        <SelectItem key={i} value={status}>
                          {status}
                        </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* City Dropdown */}
              <Select onValueChange={(value) => setSelectedCity(value)} defaultValue="All">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>City</SelectLabel>
                    {cityOptions.map((city, i) => (
                        <SelectItem key={i} value={city}>
                          {city}
                        </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Refresh Button */}
              <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchData}
                  className="ml-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <RefreshCw size={16} className="mr-2" /> Refresh
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                    <Skeleton key={i} className="h-64 rounded-xl" />
                ))
            ) : (
                paginatedProjects.map((project) => (
                    <div
                        key={project.project_id}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                        onMouseEnter={() => setHoveredId(project.project_id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                            src={
                                project.project_image ||
                                "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg"
                            }
                            alt={project.project_name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div
                            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                                hoveredId === project.project_id
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                          <div className="grid grid-cols-2 gap-6">
                            {cameraFeatures.map(({ icon: Icon, title, href }, i) => (
                                <Link
                                    key={i}
                                    href={href}
                                    className="flex flex-col items-center text-white hover:text-[#FDC700] group/icon"
                                >
                                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full group-hover/icon:bg-[#FDC700]/20">
                                    <Icon size={24} />
                                  </div>
                                  <span className="text-xs mt-2 font-medium">{title}</span>
                                </Link>
                            ))}
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            project.status
                        )}`}
                    >
                      {project.status}
                    </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FDC700] mb-4">
                          {project.project_name}
                        </h3>
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-gray-600">
                            <MapPin size={16} className="mr-2" />
                            <span className="text-sm">{project.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock size={16} className="mr-2" />
                            <span className="text-sm">
                        Started:{" "}
                              {new Date(project.start_date).toLocaleDateString()}
                      </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href="/dashboard/timelapse-images" className="flex-1">
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer w-full border-[#FDC700] text-[#FDC700] hover:bg-[#FDC700] hover:text-white"
                            >
                              <Camera size={16} className="mr-2" /> Monitor
                            </Button>
                          </Link>

                          <Link href="/dashboard/project-details" className="flex-1">
                            <Button
                                size="sm"
                                className="cursor-pointer w-full bg-[#FDC700] hover:bg-[#F59E0B] text-white"
                            >
                              <Eye size={16} className="mr-2" /> Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                ))
            )}
          </div>

          {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent className="gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                          size="sm"
                          onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          className={`${
                              currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "hover:bg-[#FDC700]/10 hover:text-[#FDC700]"
                          }`}
                      />
                    </PaginationItem>

                    {pageNumbers.map((page, i) => (
                        <PaginationItem key={i}>
                          {page === "..." ? (
                              <span className="px-4 py-2 text-gray-500">...</span>
                          ) : (
                              <button
                                  onClick={() => setCurrentPage(page as number)}
                                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                      currentPage === page
                                          ? "bg-[#FDC700] text-white shadow-lg"
                                          : "text-gray-700 hover:bg-[#FDC700]/10 hover:text-[#FDC700]"
                                  }`}
                              >
                                {page}
                              </button>
                          )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                          size="sm"
                          onClick={() =>
                              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                          }
                          className={`${
                              currentPage === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : "hover:bg-[#FDC700]/10 hover:text-[#FDC700]"
                          }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
          )}
        </div>
      </div>
  );
}
