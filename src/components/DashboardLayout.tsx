
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Receipt,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: FileText, label: "Invoices", href: "/invoices" },
  { icon: Receipt, label: "Expenses", href: "/expenses" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform bg-white border-r border-gray-200",
          isSidebarOpen ? "w-64" : "w-20",
          "transform-gpu transition-all duration-200 ease-in-out"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "font-semibold text-xl text-emerald-600",
                !isSidebarOpen && "hidden"
              )}
            >
              Expensify
            </motion.h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5 text-gray-500" />
              ) : (
                <Menu className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
              >
                <item.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-emerald-500" />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "transition-all duration-200 ease-in-out",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
