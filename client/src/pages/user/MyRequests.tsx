import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useApp } from "../../contexts/AppContext";
import RequestCard from "../../components/user/RequestCard";

export const MyRequests: React.FC = () => {
  const { myRequests, getMyRequests, cancelServiceRequest } = useApp();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleCancel = async (id: number) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) {
      return;
    }

    try {
      await cancelServiceRequest(id);
      alert("Request cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel request:", error);
      alert("Failed to cancel request. Please try again.");
    }
  };
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        await getMyRequests();
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        setError("Failed to load your service requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      <Navbar />

      <main className="flex-1 max-w-350 w-full mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Requests
          </h1>

          <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 border border-gray-200 rounded-full">
            Total: {myRequests.length}
          </span>
        </div>

        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
            Loading your requests...
          </div>
        ) : error ? (
          <div className="bg-white border border-red-200 rounded-xl p-8 text-center text-red-600">
            {error}
          </div>
        ) : myRequests.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
            No service requests found.
          </div>
        ) : (
          <div className="space-y-4">
            {myRequests.map((req) => (
              <RequestCard key={req.id} req={req} handleCancel={handleCancel} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
