import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/Button";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Things Break. We Help Fix Them.
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mb-8">
          Find the right professional for your home repairs and everyday service
          needs. Book a trusted technician and let them take care of the rest.
        </p>
        <Button
          className="bg-purple-600 text-white rounded-2xl py-2 shadow-md shadow-purple-500"
          onClick={() => navigate("/skill-selection")}
        >
          Request Service
        </Button>
      </main>

      <Footer />
    </div>
  );
};
