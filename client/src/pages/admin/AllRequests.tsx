import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useApp } from "../../contexts/AppContext";
import { ADMIN_NAV } from "../../configs";
import AdminRequestCard from "../../components/admin/AdminRequestCard";

export const AllRequests: React.FC = () => {
  const { requests, getAllServiceRequests, cancelAdminServiceRequest } =
    useApp();

  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async (requestId: string): Promise<void> => {
    if (
      !window.confirm("Are you sure you want to cancel this service request?")
    ) {
      return;
    }

    setCancellingId(requestId);
    setError(null);

    try {
      await cancelAdminServiceRequest(requestId);
    } catch (error) {
      console.error(error);
      setError("Failed to cancel the service request. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  const fetchRequests = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await getAllServiceRequests();
    } catch (error) {
      console.error(error);
      setError("Failed to load service requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchRequests();
  }, []);

  return (
    <DashboardLayout navItems={ADMIN_NAV}>
      <main className="max-w-350 w-full mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            All Requests
          </h1>

          <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 border border-gray-200 rounded-full">
            Total: {requests.length}
          </span>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
            {requests.length === 0 && (
              <button
                onClick={() => void fetchRequests()}
                className="ml-3 text-blue-600 hover:underline"
              >
                Try again
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
            Loading service requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
            No service requests found.
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <AdminRequestCard
                key={req.id}
                req={req}
                handleCancel={handleCancel}
                cancellingId={cancellingId}
              />
            ))}
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};
