import React from "react";
import type { AssignedTaskCardProps, RequestStatus } from "../../types";

const ALL_STATUSES: RequestStatus[] = [
  "CREATED",
  "ASSIGNED",
  "ACCEPTED",
  "ON_THE_WAY",
  "ARRIVED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

const AssignedTaskCard: React.FC<AssignedTaskCardProps> = ({
  req,
  activePopoverId,
  togglePopover,
  setActivePopoverId,
  updateRequestStatus,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
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
            Location
          </span>
          <span className="text-gray-700 truncate block" title={req.location}>
            {req.location}
          </span>
        </div>

        <div
          className="sm:col-span-2 md:col-span-2 relative group cursor-pointer"
          onClick={(e) => togglePopover(req.id, e)}
        >
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Problem{" "}
            <span className="text-[10px] text-purple-500 font-normal">
              (tap/hover for details)
            </span>
          </span>

          <p className="text-gray-700 truncate block max-w-xs font-medium">
            {req.description}
          </p>

          <div className="hidden md:group-hover:block absolute left-0 top-full mt-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl z-20 pointer-events-none">
            <p className="font-semibold mb-1 text-purple-300">
              Full Problem Description:
            </p>
            <p>{req.description}</p>
          </div>

          {activePopoverId === req.id && (
            <div
              className="md:hidden absolute left-0 top-full mt-2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-2xl z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-1 border-b border-gray-700 pb-1">
                <span className="font-semibold text-purple-300">
                  Problem Description
                </span>

                <button
                  onClick={() => setActivePopoverId(null)}
                  className="text-gray-400 hover:text-white font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="mt-1 leading-relaxed">{req.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 min-w-50">
        <div className="flex flex-col text-right">
          <span className="text-xs text-gray-400 mb-1 font-semibold">
            Update Status:
          </span>

          <select
            value={req.status}
            onChange={(e) =>
              updateRequestStatus(req.id, e.target.value as RequestStatus)
            }
            className="px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            {ALL_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AssignedTaskCard;
