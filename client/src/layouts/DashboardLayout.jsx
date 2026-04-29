import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useState,
} from "react";

import Navbar from "../components/Navbar";

import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";

function DashboardLayout({
  children,
}) {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Subjects",
      path: "/subjects",
      icon: BookOpen,
    },
    {
      name: "Planner",
      path: "/planner",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 z-50 h-full md:h-auto w-64 bg-white dark:bg-gray-800 shadow-lg p-6 transform transition-transform duration-300 flex flex-col ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >

        {/* Mobile Close Button */}
        <button
          onClick={() =>
            setSidebarOpen(false)
          }
          className="md:hidden self-end mb-4 text-gray-700 dark:text-white"
        >
          <X size={28} />
        </button>

        {/* Logo */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Study Planner
          </h2>

          <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">
            Smart academic productivity
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">

          {navLinks.map((link) => {
            const Icon = link.icon;

            const isActive =
              location.pathname ===
              link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
                }`}
              >

                <Icon size={20} />

                {link.name}

              </Link>
            );
          })}

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 w-full md:ml-0">

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="md:hidden mb-4 text-gray-800 dark:text-white"
        >
          <Menu size={30} />
        </button>

        <Navbar />

        {children}

      </main>

    </div>
  );
}

export default DashboardLayout;