"use client";

import Link from "next/link";
import { logout } from "@/context/globalLogout";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LayoutDashboard,
  Users,
  Settings,
  Database,
  Building2,
  Bell,
  LogOut,
  Search,
  UserRound,
  ChevronDown,
  Folder,
  Camera,
  Shield,
  LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

function SidebarNavItem({ item }: { item: { title: string; url: string; icon: LucideIcon } }) {
  const pathname = usePathname();
  const isActive = pathname === item.url || pathname === `${item.url}/`;
  const { state } = useSidebar();

  const menuButton = (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={state === "collapsed" ? item.title : undefined}
      className={cn(
        "rounded-xl group-data-[collapsible=icon]:rounded-full transition-all duration-200",
        "hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30 hover:text-[var(--brand-text-primary)] dark:hover:text-[var(--brand-text-secondary)] items-center",
        "px-4 py-2.5 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center",
        isActive 
          ? "bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-primary)] text-[var(--brand-text-primary)] dark:text-white shadow-md" 
          : "text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]"
      )}
    >
      <Link 
        href={item.url} 
        className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
      >
        <item.icon className={cn(
          "h-4 w-4 shrink-0 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5",
          isActive ? "text-[var(--brand-text-primary)] dark:text-white" : "text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]"
        )} />
        <span className="text-sm transition-all duration-200 font-medium group-data-[collapsible=icon]:hidden">
          {item.title}
        </span>
      </Link>
    </SidebarMenuButton>
  );

  return menuButton;
}

const sidebarMenuItems = [
  {
    title: "Home",
    items: [
      {
        title: "Dashboard",
        url: "/company-dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Modules",
    items: [
      {
        title: "Projects",
        url: "/company-dashboard/projects",
        icon: Folder,
      },
      {
        title: "Cameras",
        url: "/company-dashboard/cameras",
        icon: Camera,
      },
      {
        title: "Users",
        url: "/company-dashboard/users",
        icon: Users,
      },
      {
        title: "Roles & Permissions",
        url: "/company-dashboard/roles",
        icon: Shield,
      },
    ],
  },
  {
    title: "Access Control",
    items: [
      {
        title: "Feature Access",
        url: "/company-dashboard/assign",
        icon: Database,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "My Profile",
        url: "/company-dashboard/profile",
        icon: UserRound,
      },
      {
        title: "Settings",
        url: "/company-dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar
          collapsible="icon"
          className="border-r border-[var(--brand-border)] dark:border-[var(--brand-border)] border-solid bg-gradient-to-b from-[var(--brand-bg-primary)] to-[var(--brand-bg-secondary)] dark:from-[var(--brand-bg-primary)] dark:to-[var(--brand-bg-secondary)] backdrop-blur supports-[backdrop-filter]:backdrop-blur"
        >
          <SidebarHeader className="border-b border-[var(--brand-border)] dark:border-[var(--brand-border)] px-4 py-6 group-data-[collapsible=icon]:px-2">
            <SidebarMenuButton
              asChild
              className="h-auto p-0 hover:bg-transparent group-data-[collapsible=icon]:justify-center"
            >
              <Link
                href="/company-dashboard"
                className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/30 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shrink-0 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 shadow-sm">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
                  <span className="text-base font-semibold leading-none text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                    Super Admin
                  </span>
                  <span className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                    Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarHeader>

          <SidebarContent className="px-3 py-4 group-data-[collapsible=icon]:px-2">
            <SidebarMenu className="space-y-1">
              {sidebarMenuItems.map((group) => (
                <SidebarGroup key={group.title}>
                  <SidebarGroupLabel className="px-2 text-xs font-semibold text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] uppercase tracking-wider group-data-[collapsible=icon]:hidden">
                    {group.title}
                  </SidebarGroupLabel>
                  <SidebarGroupContent className="mt-2 space-y-1">
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.url} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                        <SidebarNavItem item={item} />
                      </SidebarMenuItem>
                    ))}
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <TopNavbar />
          <main className="flex-1 overflow-y-auto bg-background p-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function TopNavbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    {
      id: 1,
      title: "Project deadline approaching",
      message: 'Project "Triverse Tower" deadline approaching.',
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "New user registration",
      message: "You have a new user registration.",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "Permissions updated",
      message: "Permissions updated successfully.",
      time: "1 day ago",
    },
    {
      id: 4,
      title: "Server restarted",
      message: "Server restarted at 11:30 AM.",
      time: "2 days ago",
    },
  ];

  return (
    <header 
      className="justify-between sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-[var(--brand-border)] dark:border-[var(--brand-border)] border-solid bg-gradient-to-r from-[var(--brand-bg-primary)] to-[var(--brand-bg-secondary)] dark:from-[var(--brand-bg-primary)] dark:to-[var(--brand-bg-secondary)] backdrop-blur supports-[backdrop-filter]:backdrop-blur px-6 shadow-sm"
      suppressHydrationWarning
    >
      <SidebarTrigger className="h-9 w-9 rounded-lg border border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200" />

      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 z-10 pointer-events-none text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full rounded-xl border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] bg-white dark:bg-[var(--brand-bg-primary)]/30 backdrop-blur pl-10 pr-4 text-sm text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] placeholder:text-[var(--brand-primary)]/70 dark:placeholder:text-[var(--brand-text-secondary)]/60 transition-all duration-200 focus:border-[var(--brand-primary)] dark:focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/40 dark:focus:ring-[var(--brand-primary)]/30"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg border border-[var(--brand-border-light)] dark:border-[var(--brand-border-medium)] hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/30 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white text-[10px] font-semibold shadow-md">
                4
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[500px] bg-gradient-to-b from-[var(--brand-bg-primary)] to-white dark:from-[var(--brand-bg-primary)] dark:to-[var(--brand-bg-secondary)] border-l border-[var(--brand-border)] dark:border-[var(--brand-border)]">
            <SheetHeader className="border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)] pb-4">
              <SheetTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                Notifications
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="group rounded-xl border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-white dark:bg-[var(--brand-bg-primary)]/20 backdrop-blur p-4 transition-all duration-200 hover:border-[var(--brand-primary)] dark:hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                        {notification.title}
                      </p>
                      <p className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                        {notification.message}
                      </p>
                      <p className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 gap-2 rounded-lg border border-[var(--brand-border-light)] dark:border-[var(--brand-border-medium)] px-3 hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/30 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
                <UserRound className="h-4 w-4" />
              </div>
              <span className="hidden text-sm font-medium sm:inline-block">
                Company Admin
              </span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-[var(--brand-bg-primary)]/95 backdrop-blur border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)]">
            <div className="flex items-center gap-3 px-2 py-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white shadow-sm">
                <UserRound className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Company Admin</p>
                <p className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                  admin@company.com
                </p>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-[var(--brand-primary)]/30 dark:bg-[var(--brand-primary)]/30" />
            <DropdownMenuItem asChild className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30">
              <Link
                href="/company-dashboard/profile"
                className="flex items-center gap-2"
              >
                <UserRound className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)]/20 dark:hover:bg-[var(--brand-primary)]/30">
              <Link
                href="/company-dashboard/settings"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[var(--brand-primary)]/30 dark:bg-[var(--brand-primary)]/30" />
            <DropdownMenuItem
              className="text-[var(--brand-primary)] dark:text-[var(--brand-primary)] hover:text-[var(--brand-text-primary)] dark:hover:text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30 focus:text-[var(--brand-primary)] dark:focus:text-[var(--brand-primary)]"
               onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
