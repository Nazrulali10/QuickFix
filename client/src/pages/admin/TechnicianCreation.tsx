import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../contexts/AppContext";
import { ADMIN_NAV } from "../../configs";

export const TechnicianCreation: React.FC = () => {
  const { skills, getSkills, createTechnician } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    skillIds: [] as number[],
  });

  const [loadingSkills, setLoadingSkills] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        await getSkills();
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        setError("Failed to load skills.");
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillToggle = (skillId: number) => {
    setFormData((prev) => ({
      ...prev,
      skillIds: prev.skillIds.includes(skillId)
        ? prev.skillIds.filter((id) => id !== skillId)
        : [...prev.skillIds, skillId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.skillIds.length === 0) {
      setError("Please select at least one skill.");
      return;
    }

    try {
      setSubmitting(true);

      await createTechnician(formData);

      navigate("/admin/technicians");
    } catch (err) {
      console.error("Failed to create technician:", err);
      setError("Failed to create technician. Check the details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout navItems={ADMIN_NAV}>
      <main className="max-w-2xl w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create Technician
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-purple-500 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-500 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-500 mb-1">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-500 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Skills
              </label>

              {loadingSkills ? (
                <p className="text-sm text-gray-500">Loading skills...</p>
              ) : skills.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No skills available. Add skills first.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => handleSkillToggle(skill.id)}
                      className={`px-3 py-2 rounded-full text-xs font-semibold border ${
                        formData.skillIds.includes(skill.id)
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white text-purple-500 border-gray-300"
                      }`}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 justify-center bg-purple-500 text-white"
                disabled={submitting || loadingSkills || skills.length === 0}
              >
                {submitting ? "Creating..." : "Create Technician"}
              </Button>

              <button
                type="button"
                onClick={() => navigate("/admin/technicians")}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-purple-500 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </DashboardLayout>
  );
};
