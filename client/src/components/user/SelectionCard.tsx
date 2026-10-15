import {
  AirVent,
  Faucet,
  Refrigerator,
  WashingMachine,
  Zap,
} from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";

const SERVICE_DETAILS: Record<
  string,
  { icon: ReactElement; description: string }
> = {
  "AC Repair & Service": {
    icon: <AirVent />,
    description:
      "Installation, servicing, and repair for all types of air conditioners.",
  },
  "Electrical Repair": {
    icon: <Zap />,
    description:
      "Wiring, switchboard fixes, fixture installations, and electrical troubleshooting.",
  },
  Plumbing: {
    icon: <Faucet />,
    description:
      "Leak fixes, pipe replacements, tap installation, and drainage solutions.",
  },
  "Washing Machine Repair": {
    icon: <WashingMachine />,
    description:
      "Diagnosis and repair for front load, top load, and semi-automatic machines.",
  },
  "Refrigerator Repair": {
    icon: <Refrigerator />,
    description:
      "Cooling fixes, gas charging, compressor repairs, and routine maintenance.",
  },
};

const SelectionCard = () => {
  const navigate = useNavigate();
  const { skills } = useApp();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.length === 0 ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : (
        skills.map((skill) => {
          return (
            <div
              key={skill.id}
              onClick={() =>
                navigate(
                  `/post-request?skillId=${skill.id}&skillName=${encodeURIComponent(skill.name)}`,
                )
              }
              className="bg-white border border-gray-200 hover:border-purple-500 rounded-xl p-6 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-4 text-purple-500">
                  {SERVICE_DETAILS[skill.name].icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {skill.name}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {SERVICE_DETAILS[skill.name].description}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SelectionCard;
