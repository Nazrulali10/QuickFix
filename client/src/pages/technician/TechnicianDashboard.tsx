import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useApp } from "../../contexts/AppContext";
import { TECHNICIAN_NAV } from "../../configs";
import AssignedTaskCard from "../../components/technician/AssignedTaskCard";

export const TechnicianDashboard: React.FC = () => {
  const {
    assignedRequests,
    getTechnicianRequests,
    getTechnicianProfile,
    technician,
    updateRequestStatus,
  } = useApp();

  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        await Promise.all([getTechnicianProfile(), getTechnicianRequests()]);
      } catch (err) {
        console.error("Failed to load technician dashboard:", err);
        setError("Failed to load your assigned tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const togglePopover = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePopoverId((prev) => (prev === id ? null : id));
  };

  return (
    <DashboardLayout navItems={TECHNICIAN_NAV}>
      <div onClick={() => setActivePopoverId(null)}>
        <main className="max-w-350 w-full mx-auto px-4 py-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Assigned Tasks
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Welcome, {technician?.name ?? "Technician"}! Manage your
                assigned tasks below.
              </p>
            </div>

            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 border border-gray-200 rounded-full">
              Assigned: {assignedRequests.length}
            </span>
          </div>

          {loading ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
              Loading assigned tasks...
            </div>
          ) : error ? (
            <div className="bg-white border border-red-200 rounded-xl p-8 text-center">
              <p className="text-red-600">{error}</p>

              <button
                onClick={() => {
                  setLoading(true);
                  setError("");

                  void Promise.all([
                    getTechnicianProfile(),
                    getTechnicianRequests(),
                  ])
                    .catch((err) => {
                      console.error(err);
                      setError(
                        "Failed to load your assigned tasks. Please try again.",
                      );
                    })
                    .finally(() => setLoading(false));
                }}
                className="mt-3 text-purple-600 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : assignedRequests.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No tasks assigned yet
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                You don't have any service requests assigned to you right now.
                Please check back later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignedRequests.map((req) => (
                <AssignedTaskCard
                  key={req.id}
                  req={req}
                  activePopoverId={activePopoverId}
                  togglePopover={togglePopover}
                  setActivePopoverId={setActivePopoverId}
                  updateRequestStatus={updateRequestStatus}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
};
