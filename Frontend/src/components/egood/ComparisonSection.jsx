import { Zap, Fuel, TrendingUp, TrendingDown, DollarSign, Gauge, Battery, Droplets, ArrowRight } from "lucide-react";
import { allVehicles } from "../../lib/vehicleData";
import { motion } from "framer-motion";

function StatRow({ label, evValue, cvValue, evBetter }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground w-32 shrink-0">{label}</span>
      <div className="flex-1 flex items-center justify-between gap-2">
        <span className={`text-sm font-semibold ${evBetter ? "text-cyan-600" : "text-foreground"}`}>
          {evValue}
          {evBetter && <TrendingUp className="inline w-3 h-3 ml-1" />}
        </span>
        <ArrowRight className="w-3 h-3 text-muted-foreground/50 shrink-0" />
        <span className={`text-sm font-semibold text-right ${!evBetter ? "text-orange-600" : "text-foreground"}`}>
          {cvValue}
          {!evBetter && <TrendingUp className="inline w-3 h-3 ml-1" />}
        </span>
      </div>
    </div>
  );
}

export default function ComparisonSection({ selectedVehicles }) {
  const evSelected = allVehicles.find(
    (v) => v.type === "eletrico" && selectedVehicles.includes(v.id)
  );
  const cvSelected = allVehicles.find(
    (v) => v.type === "combustao" && selectedVehicles.includes(v.id)
  );

  if (!evSelected || !cvSelected) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
            <Gauge className="w-9 h-9 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Comparação de Veículos</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Selecione <strong>1 veículo elétrico</strong> e <strong>1 veículo a combustão</strong> na aba
            "Veículos" para ver a comparação detalhada.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${evSelected ? "bg-cyan-100 text-cyan-700" : "bg-secondary text-muted-foreground"}`}>
              <Zap className="w-4 h-4" />
              {evSelected ? evSelected.model : "Selecione um EV"}
            </div>
            <span className="text-muted-foreground">vs</span>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${cvSelected ? "bg-orange-100 text-orange-700" : "bg-secondary text-muted-foreground"}`}>
              <Fuel className="w-4 h-4" />
              {cvSelected ? cvSelected.model : "Selecione um combustão"}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Calculate annual costs
  const kmPerYear = 15000;
  const energyCostKwh = 0.85;
  const gasolineCostL = 5.79;

  const evAnnualCost = (evSelected.consumptionNum / 100) * kmPerYear * energyCostKwh;
  const cvAnnualCost = (cvSelected.consumptionNum / 100) * kmPerYear * gasolineCostL;
  const savings = cvAnnualCost - evAnnualCost;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Comparação Detalhada</h2>
        <p className="text-muted-foreground text-sm">Baseado em {kmPerYear.toLocaleString("pt-BR")} km/ano</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {/* EV Card */}
        <div className="bg-white rounded-2xl border-2 border-cyan-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{evSelected.brand}</p>
              <h3 className="text-lg font-bold">{evSelected.model}</h3>
            </div>
            <span className="ml-auto text-lg font-bold text-cyan-600">{evSelected.price}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Consumo</span>
              <span className="font-semibold">{evSelected.consumption}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Custo anual combustível</span>
              <span className="font-semibold text-cyan-600">
                R$ {evAnnualCost.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Categoria</span>
              <span className="font-semibold">{evSelected.category}</span>
            </div>
          </div>
        </div>

        {/* CV Card */}
        <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <Fuel className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{cvSelected.brand}</p>
              <h3 className="text-lg font-bold">{cvSelected.model}</h3>
            </div>
            <span className="ml-auto text-lg font-bold text-orange-600">{cvSelected.price}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Consumo</span>
              <span className="font-semibold">{cvSelected.consumption}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Custo anual combustível</span>
              <span className="font-semibold text-orange-600">
                R$ {cvAnnualCost.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Categoria</span>
              <span className="font-semibold">{cvSelected.category}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Savings Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl p-6 text-center text-white shadow-lg shadow-cyan-500/20"
      >
        <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-80" />
        <p className="text-sm font-medium text-white/80 mb-1">Economia anual estimada com o elétrico</p>
        <p className="text-3xl sm:text-4xl font-black">
          R$ {savings.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
        </p>
        <p className="text-xs text-white/60 mt-2">
          Considerando gasolina a R$ {gasolineCostL.toFixed(2).replace(".", ",")} /L e energia a R$ {energyCostKwh.toFixed(2).replace(".", ",")} /kWh
        </p>
      </motion.div>
    </section>
  );
}