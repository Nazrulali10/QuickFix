
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import AvailableTechnicianCard from "../../components/admin/AvailableTechnicianCard";

export default function AssignTechnician() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();

  const {
    requests,
    technicians,
    getAllServiceRequests,
    getAllTechnicians,
    assignTechnician,
  } = useApp();

  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        await Promise.all([
          getAllServiceRequests(),
          getAllTechnicians(),
        ]);
      } catch {
        setError("Failed to load the request or technicians.");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  const serviceRequest = requests.find(
    (request) => String(request.id) === requestId
  );

  const matchingTechnicians = useMemo(() => {
    if (!serviceRequest) return [];

    return technicians.filter((technician) => {
      const isActive = technician.status === "ACTIVE";

      const hasRequiredSkill = technician.skills?.some(
        (skill) =>
          skill.trim().toLowerCase() ===
          serviceRequest.skillName.trim().toLowerCase()
      );

      return isActive && hasRequiredSkill;
    });
  }, [technicians, serviceRequest]);

  const handleAssign = async (technicianId: string) => {
    if (!requestId) return;

    setAssigningId(technicianId);
    setError("");

    try {
      await assignTechnician(requestId, {
        technicianId: Number(technicianId),
      });

      navigate("/admin/requests");
    } catch {
      setError(
        "Unable to assign this technician. Please check the request and try again."
      );
    } finally {
      setAssigningId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading technicians...
      </div>
    );
  }

  if (!serviceRequest) {
    return (
      <div className="p-6">
        <p className="text-red-600">
          Service request not found.
        </p>

        <button
          onClick={() => navigate("/admin/requests")}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-white"
        >
          Back to requests
        </button>
      </div>
    );
  }

 
return (
  <div className="p-6">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Assign Technician
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Choose an active technician who has the required skill.
      </p>
    </div>

    {error && (
      <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {error}
      </div>
    )}

    <h2 className="mb-4 text-lg font-semibold text-gray-900">
      Available Technicians
    </h2>

    {matchingTechnicians.length === 0 ? (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <p className="font-medium text-gray-800">
          No matching technicians are available.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Only active technicians with the required skill are shown.
        </p>
      </div>
    ) : (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {matchingTechnicians.map((technician) => (
          <AvailableTechnicianCard
            key={technician.id}
            technician={technician}
            assigning={assigningId === String(technician.id)}
            onAssign={handleAssign}
          />
        ))}
      </div>
    )}
  </div>
);
}
