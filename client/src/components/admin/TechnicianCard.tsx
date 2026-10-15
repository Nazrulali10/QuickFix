import type { TechnicianCardProps, TechnicianStatus } from "../../types/index";

const TechnicianCard = ({ tech }: TechnicianCardProps) => {
  const getStatusBadge = (status: TechnicianStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-300";
      case "BUSY":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "OFFLINE":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center text-sm">
        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Name
          </span>
          <span className="font-semibold text-gray-900">{tech.name}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Email
          </span>
          <span className="text-gray-700 break-all">{tech.email}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Phone
          </span>
          <span className="text-gray-700">{tech.phone}</span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase">
            Skills
          </span>
          <span className="text-gray-700">
            {tech.skills.join(", ") || "No skills"}
          </span>
        </div>

        <div>
          <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">
            Status
          </span>
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(tech.status)}`}
          >
            {tech.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TechnicianCard;
