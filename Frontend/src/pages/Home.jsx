import { useState } from "react";
import HeroSection from "../components/egood/HeroSection";
import TabNavigation from "../components/egood/TabNavigation";
import VehicleSection from "../components/egood/VehicleSection";
import ComparisonSection from "../components/egood/ComparisonSection";
import SolarCalculator from "../components/egood/SolarCalculator";
import FuelCalculator from "../components/egood/FuelCalculator";
import Footer from "../components/egood/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("veiculos");
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const handleToggleVehicle = (vehicleId) => {
    setSelectedVehicles((prev) => {
      const isEV = vehicleId.startsWith("ev");
      const isSelected = prev.includes(vehicleId);

      if (isSelected) {
        return prev.filter((id) => id !== vehicleId);
      }

      // Replace same type selection (only 1 EV and 1 combustion at a time)
      const filtered = prev.filter((id) =>
        isEV ? !id.startsWith("ev") : !id.startsWith("cv")
      );
      return [...filtered, vehicleId];
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "veiculos" && (
        <VehicleSection
          selectedVehicles={selectedVehicles}
          onToggleVehicle={handleToggleVehicle}
        />
      )}

      {activeTab === "comparacao" && (
        <ComparisonSection selectedVehicles={selectedVehicles} />
      )}

      {activeTab === "solar" && <SolarCalculator />}
      {activeTab === "calculadora" && <FuelCalculator />}
    

      <Footer />
    </div>
  );
}