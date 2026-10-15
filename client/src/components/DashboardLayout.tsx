import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import type { DashboardLayoutProps } from "../types";

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  navItems,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      <div className="flex flex-1 mt-10">
        <Sidebar items={navItems} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
