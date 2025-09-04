/**
 * Dashboard layout component
 * 
 * This layout wraps all dashboard pages and can include shared navigation,
 * sidebars, or other common dashboard elements.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  );
}