"use client";

import Link from "next/link";
import {
  Users,
  LayoutDashboard,
  Video,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Activity,
  ChartPie,
  BarChart,
  Plus,
  ArrowRight,
  LucideIcon,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statCards = [
  {
    label: "Companies",
    value: "12",
    icon: Building2,
    trend: "+12%",
    gradient: "from-[var(--brand-primary)]/30 to-[var(--brand-secondary)]/30 dark:from-[var(--brand-primary)]/30 dark:to-[var(--brand-secondary)]/30",
    iconColor: "text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]",
    bgColor: "bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-text-secondary)]/20",
    borderColor: "border-[var(--brand-border-medium)] dark:border-[var(--brand-border)]",
  },
  {
    label: "Projects",
    value: "45",
    icon: LayoutDashboard,
    trend: "+12%",
    gradient: "from-[var(--brand-primary)]/30 to-[var(--brand-secondary)]/30 dark:from-[var(--brand-primary)]/30 dark:to-[var(--brand-secondary)]/30",
    iconColor: "text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]",
    bgColor: "bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-text-secondary)]/20",
    borderColor: "border-[var(--brand-border-medium)] dark:border-[var(--brand-border)]",
  },
  {
    label: "Cameras",
    value: "84",
    icon: Video,
    trend: "+8%",
    gradient: "from-[var(--brand-primary)]/30 to-[var(--brand-secondary)]/30 dark:from-[var(--brand-primary)]/30 dark:to-[var(--brand-secondary)]/30",
    iconColor: "text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]",
    bgColor: "bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-text-secondary)]/20",
    borderColor: "border-[var(--brand-border-medium)] dark:border-[var(--brand-border)]",
  },
  {
    label: "Admins",
    value: "18",
    icon: Users,
    trend: "+5%",
    gradient: "from-[var(--brand-primary)]/30 to-[var(--brand-secondary)]/30 dark:from-[var(--brand-primary)]/30 dark:to-[var(--brand-secondary)]/30",
    iconColor: "text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]",
    bgColor: "bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-text-secondary)]/20",
    borderColor: "border-[var(--brand-border-medium)] dark:border-[var(--brand-border)]",
  },
  {
    label: "Roles",
    value: "5",
    icon: ShieldCheck,
    trend: "+2%",
    gradient: "from-[var(--brand-primary)]/30 to-[var(--brand-secondary)]/30 dark:from-[var(--brand-primary)]/30 dark:to-[var(--brand-secondary)]/30",
    iconColor: "text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]",
    bgColor: "bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-text-secondary)]/20",
    borderColor: "border-[var(--brand-border-medium)] dark:border-[var(--brand-border)]",
  },
  {
    label: "Billing Active",
    value: "8",
    icon: DollarSign,
    trend: "+15%",
    gradient: "from-[var(--brand-primary)]/30 to-[var(--brand-secondary)]/30 dark:from-[var(--brand-primary)]/30 dark:to-[var(--brand-secondary)]/30",
    iconColor: "text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]",
    bgColor: "bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-text-secondary)]/20",
    borderColor: "border-[var(--brand-border-medium)] dark:border-[var(--brand-border)]",
  },
];

const quickActions = [
  { label: "Create Company", href: "/triverse-dashboard/companies-access", icon: Plus },
  { label: "Company Admin", href: "/triverse-dashboard/company-super-admins", icon: Plus },
  { label: "Add Project", href: "/triverse-dashboard/projects", icon: Plus },
  { label: "Add Camera", href: "/triverse-dashboard/cameras", icon: Plus },
  { label: "Manage Users", href: "/triverse-dashboard/users", icon: Users },
  { label: "Assign Role", href: "/triverse-dashboard/roles&permissions", icon: ShieldCheck },
  { label: "Enable Features", href: "/triverse-dashboard/assign", icon: Activity },
  { label: "Settings", href: "/triverse-dashboard/settings", icon: LayoutDashboard },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
            Welcome back to your Dashboard!
          </h1>
          <p className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-1.5">
            Here&apos;s what&apos;s happening with your dashboard today.
          </p>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-bg-primary)] to-[var(--brand-bg-secondary)] dark:from-[var(--brand-bg-primary)]/50 dark:to-[var(--brand-bg-secondary)]/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm">
        <CardHeader className="pb-4 border-b border-[var(--brand-border-light)] dark:border-[var(--brand-border-light)]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">Quick Actions</CardTitle>
            <Activity className="h-5 w-5 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="group relative flex flex-col items-center gap-3 rounded-xl border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-white dark:bg-[var(--brand-bg-primary)]/20 backdrop-blur p-4 transition-all duration-300 hover:border-[var(--brand-primary)] dark:hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30 hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] dark:bg-[var(--brand-primary)] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--brand-primary)]/90 dark:group-hover:bg-[var(--brand-primary)]/90 shadow-sm">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-center text-sm font-medium text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
                    {action.label}
                  </span>
                  <ArrowRight className="absolute right-2 top-2 h-4 w-4 -translate-x-2 opacity-0 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 dark:from-[var(--brand-primary)]/20 dark:to-[var(--brand-text-secondary)]/20 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">$124,563</p>
                <p className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
                  <span className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">+23.5%</span> from last month
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-text-secondary)]/30">
                <BarChart className="h-6 w-6 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 dark:from-[var(--brand-primary)]/20 dark:to-[var(--brand-text-secondary)]/20 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                  Active Sessions
                </p>
                <p className="text-2xl font-bold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">1,234</p>
                <p className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] flex items-center gap-1">
                  <Activity className="h-3 w-3 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
                  <span className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">+12.3%</span> from last week
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-text-secondary)]/30">
                <Activity className="h-6 w-6 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[var(--brand-border-medium)] dark:border-[var(--brand-border)] bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 dark:from-[var(--brand-primary)]/20 dark:to-[var(--brand-text-secondary)]/20 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">3.24%</p>
                <p className="text-xs text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] flex items-center gap-1">
                  <ChartPie className="h-3 w-3 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
                  <span className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">+0.5%</span> from last month
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-primary)]/20 dark:bg-[var(--brand-text-secondary)]/30">
                <ChartPie className="h-6 w-6 text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  gradient,
  iconColor,
  bgColor,
  borderColor,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  gradient: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <Card className={cn(
      "group relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]",
      borderColor,
      `bg-gradient-to-br ${gradient}`
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)]">{label}</p>
            <p className="text-2xl font-bold text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">{value}</p>
            <p className="text-xs font-medium text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </p>
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 shadow-sm",
            bgColor
          )}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
