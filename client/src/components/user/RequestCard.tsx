import { X } from "lucide-react";
import type { RequestCardProps } from "../../types/index";
import { getStatusBadge } from "../../utils";

const RequestCard = ({ req, handleCancel }: RequestCardProps) => {
  return (
    <div className="bg-gray-50  rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center text-sm">
        <div>
          <span className="block text-xs font-semibold text-purple-400 uppercase">
            Service
          </span>
          <span className="font-semibold text-gray-900">
            {req.skill?.name ?? "N/A"}
          </span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-purple-400 uppercase">
            Customer
          </span>
          <span className="text-gray-700">{req.user?.name ?? "You"}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-purple-400 uppercase">
            Technician
          </span>
          <span className="text-gray-700">
            {req.technician?.name ?? "Not assigned"}
          </span>
        </div>

        <div className="sm:col-span-2 md:col-span-1">
          <span className="block text-xs font-semibold text-purple-400 uppercase">
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
          <span className="block text-xs font-semibold text-purple-400 uppercase">
            Location
          </span>
          <span className="text-gray-700 truncate block" title={req.location}>
            {req.location}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(req.status)}`}
        >
          {req.status.replaceAll("_", " ")}
        </span>

        <span className="text-xs text-purple-400 whitespace-nowrap">
          {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "N/A"}
        </span>

        {req.status !== "COMPLETED" && req.status !== "CANCELLED" && (
          <button
            onClick={() => handleCancel(req.id)}
            title="Cancel Request"
            className="p-1.5 text-purple-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center border border-gray-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
