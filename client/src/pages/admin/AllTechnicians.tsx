import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../contexts/AppContext";
import { ADMIN_NAV } from "../../configs";
import TechnicianCard from "../../components/admin/TechnicianCard";

export const AllTechnicians: React.FC = () => {
  const { technicians, getAllTechnicians } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        await getAllTechnicians();
      } catch (err) {
        console.error("Failed to fetch technicians:", err);
        setError("Failed to load technicians.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  return (
    <DashboardLayout navItems={ADMIN_NAV}>
      <main className="max-w-350 w-full mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            All Technicians
          </h1>

          <Button
            className="bg-purple-500 text-white rounded-xl mr-5 shadow-md shadow-purple-400 hover:bg-purple-600 duration-300"
            onClick={() => navigate("/admin/technicians/create")}
          >
            Add Technician
          </Button>
        </div>

        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
            Loading technicians...
          </div>
        ) : error ? (
          <div className="bg-white border border-red-200 rounded-xl p-8 text-center text-red-600">
            {error}
          </div>
        ) : technicians.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
            No technicians found.
          </div>
        ) : (
          <div className="space-y-4">
            {technicians.map((tech) => (
              <TechnicianCard key={tech.id} tech={tech} />
            ))}
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};
