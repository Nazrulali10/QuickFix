import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, Wrench } from "lucide-react";
import { Button } from "./ui/Button";
import { useApp } from "../contexts/AppContext";
import type { UserRole } from "../types";

const LOGO_ROUTES: Record<UserRole, string> = {
  USER: "/",
  TECHNICIAN: "/technician/dashboard",
  ADMIN: "/admin/technicians",
};

export const Navbar: React.FC = () => {
  const {
    isAuthenticated,
    currentRole,
    logoutUser,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const showMobileMenu =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/technician");

  const handleAuthClick = async () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    try {
      await logoutUser();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-2 py-5 md:px-16 md:py-4 shadow-md bg-white">
      <Link
        to={LOGO_ROUTES[currentRole]}
        className="flex gap-1 font-bold text-xl md:text-2xl"
      >
        <Wrench size={28} className="flex text-purple-500" />
        QuickFix
      </Link>

      <div className="flex items-center gap-3 md:gap-8">
        {currentRole === "USER" && isAuthenticated && (
          <NavLink
            to="/my-requests"
            className={({ isActive }) =>
              isActive ? "text-purple-600 " : "text-gray-500"
            }
          >
            My Requests
          </NavLink>
        )}

        <Button
          className="bg-purple-100 text-purple-600 rounded-full "
          onClick={handleAuthClick}
        >
          {isAuthenticated ? "Sign Out" : "Sign In"}
        </Button>

        {showMobileMenu && (
          <Button
            className="flex md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={20} />
          </Button>
        )}
      </div>
    </nav>
  );
};
