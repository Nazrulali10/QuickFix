import React from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import type { SidebarProps } from "../types";

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const { isSidebarOpen, setIsSidebarOpen, currentRole } = useApp();

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="px-5 py-4 border-b border-gray-100 md:hidden">
          <span className="text-sm font-semibold text-gray-500">
            {currentRole}
          </span>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-semibold transition ${
                  isActive
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
