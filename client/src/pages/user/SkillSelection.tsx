import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useApp } from "../../contexts/AppContext";
import SelectionCard from "../../components/user/SelectionCard";

export const SkillSelection: React.FC = () => {
  const { getSkills } = useApp();

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1 md:mb-2">
            Choose Service
          </h1>
          <p className="text-gray-400  sm:text-lg">
            Select the service you need
          </p>
        </div>
        <SelectionCard />
      </main>

      <Footer />
    </div>
  );
};
