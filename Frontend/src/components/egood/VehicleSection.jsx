import { useState } from "react";
import { Zap, Fuel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VehicleCard from "./VehicleCard";
import { electricVehicles, combustionVehicles, categories } from "../../lib/vehicleData";

export default function VehicleSection({ selectedVehicles, onToggleVehicle }) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filterByCategory = (vehicles) => {
    if (activeCategory === "Todos") return vehicles;
    return vehicles.filter((v) => v.category === activeCategory);
  };

  const filteredEV = filterByCategory(electricVehicles);
  const filteredCombustion = filterByCategory(combustionVehicles);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Escolha os Veículos para Comparar
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
          Selecione um veículo elétrico e um a combustão para ver a comparação detalhada de custos
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
              ${activeCategory === cat
                ? "bg-foreground text-background shadow-md"
                : "bg-white text-muted-foreground border border-border hover:border-foreground/20 hover:text-foreground"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Electric Vehicles */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Veículos Elétricos</h3>
            <p className="text-xs text-muted-foreground">Selecione um veículo elétrico</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredEV.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <VehicleCard
                  vehicle={vehicle}
                  isSelected={selectedVehicles.includes(vehicle.id)}
                  onSelect={onToggleVehicle}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredEV.length === 0 && (
          <p className="text-center text-muted-foreground py-8 text-sm">
            Nenhum veículo elétrico nesta categoria
          </p>
        )}
      </div>

      {/* Combustion Vehicles */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Fuel className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Veículos a Combustão</h3>
            <p className="text-xs text-muted-foreground">Selecione um veículo a combustão para comparar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredCombustion.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <VehicleCard
                  vehicle={vehicle}
                  isSelected={selectedVehicles.includes(vehicle.id)}
                  onSelect={onToggleVehicle}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCombustion.length === 0 && (
          <p className="text-center text-muted-foreground py-8 text-sm">
            Nenhum veículo a combustão nesta categoria
          </p>
        )}
      </div>
    </section>
  );
}