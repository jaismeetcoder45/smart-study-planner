import { Link, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
} from "lucide-react";

function DashboardLayout({ children }) {
  const location = useLocation();

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

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 hidden md:flex flex-col transition-colors duration-300">

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
              location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
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
      <main className="flex-1 p-6">

        <Navbar />

        {children}

      </main>

    </div>
  );
}

export default DashboardLayout;