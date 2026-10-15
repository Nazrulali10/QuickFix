import type { AvailableTechnicianCardProps } from "../../types";

const AvailableTechnicianCard = ({
  technician,
  assigning,
  onAssign,
}: AvailableTechnicianCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{technician.name}</h3>

          <p className="mt-1 text-sm text-gray-500">{technician.email}</p>

          <p className="mt-1 text-sm text-gray-500">{technician.phone}</p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Active
        </span>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Skills
        </p>

        <div className="flex flex-wrap gap-2">
          {technician.skills?.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onAssign(String(technician.id))}
        disabled={assigning}
        className="mt-5 w-full rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {assigning ? "Assigning..." : "Assign to this request"}
      </button>
    </div>
  );
};

export default AvailableTechnicianCard;
