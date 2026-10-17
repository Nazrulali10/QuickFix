import type { AdminRequestCardProps } from "../../types";
import { ActionMenu } from "../ui/ActionMenu";
import { useNavigate } from "react-router-dom";
import { getStatusBadge } from "../../utils";

const AdminRequestCard = ({
  req,
  handleCancel,
  cancellingId,
}: AdminRequestCardProps) => {
  const navigate = useNavigate();

  const isTerminal = req.status === "COMPLETED" || req.status === "CANCELLED";

  const canAssign = req.status === "CREATED";
  const isCancelling = cancellingId === req.id;

  return (
    <div className="bg-gray-50 border  border-gray-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center text-sm">
        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Service
          </span>
          <span className="font-semibold text-gray-900">{req.skillName}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Customer
          </span>
          <span className="text-gray-700">{req.userName}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Technician
          </span>
          <span className="text-gray-700">
            {req.technicianName || "Not assigned"}
          </span>
        </div>

        <div className="sm:col-span-2 md:col-span-1">
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Problem
          </span>
          <span
            className="text-gray-700 truncate block max-w-xs"
            title={req.description}
          >
            {req.description}
          </span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Location
          </span>
          <span className="text-gray-700 truncate block" title={req.location}>
            {req.location}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(req.status)}`}
        >
          {req.status.replace(/_/g, " ")}
        </span>

        <span className="text-xs text-gray-400 whitespace-nowrap">
          {req.createdAt || "N/A"}
        </span>

        <ActionMenu
          items={[
            {
              label: "Assign technician",
              onClick: () =>
                navigate(`/admin/requests/${req.id}/assign-technician`),
              disabled: !canAssign || isTerminal,
            },
            {
              label: isCancelling ? "Cancelling..." : "Cancel request",
              onClick: () => void handleCancel(req.id),
              danger: true,
              disabled: isTerminal || isCancelling,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminRequestCard;
