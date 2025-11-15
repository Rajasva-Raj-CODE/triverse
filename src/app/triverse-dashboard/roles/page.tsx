import PermissionsTable from "@/components/PermissionsTable";

export default function RolesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)]">
            Roles & Permissions
          </h1>
          <p className="text-[var(--brand-primary)] dark:text-[var(--brand-text-secondary)] mt-1.5">
            Manage system roles and user permissions
          </p>
        </div>
      </div>

      <PermissionsTable />
    </div>
  );
}
