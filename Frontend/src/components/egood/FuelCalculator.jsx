import { useState, useMemo } from "react";
import { Zap, Fuel, TrendingDown, DollarSign, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { electricVehicles, combustionVehicles } from "../../lib/vehicleData";
import AnnualCostChart from "./AnnualCostChart";

export default function FuelCalculator() {
  const [evId, setEvId] = useState(electricVehicles[14].id); // BYD Dolphin Mini
  const [cvId, setCvId] = useState(combustionVehicles[20].id); // Onix
  const [kmPerMonth, setKmPerMonth] = useState(1500);
  const [gasolinePrice, setGasolinePrice] = useState(5.79);
  const [energyPrice, setEnergyPrice] = useState(0.85);

  const ev = electricVehicles.find((v) => v.id === evId);
  const cv = combustionVehicles.find((v) => v.id === cvId);

  const results = useMemo(() => {
    const cvMonthlyCost = (cv.consumptionNum / 100) * kmPerMonth * gasolinePrice;
    const evMonthlyCost = (ev.consumptionNum / 100) * kmPerMonth * energyPrice;
    const savings = cvMonthlyCost - evMonthlyCost;
    const savingsPercent = ((savings / cvMonthlyCost) * 100).toFixed(0);
    const annualSavings = savings * 12;
    return { cvMonthlyCost, evMonthlyCost, savings, savingsPercent, annualSavings };
  }, [ev, cv, kmPerMonth, gasolinePrice, energyPrice]);

  const fmt = (val) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
          <Calculator className="w-4 h-4" />
          Calculadora de Custos
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Comparação de Custo Mensal
        </h2>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Compare o custo mensal de combustível entre um veículo a combustão e um elétrico
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* EV Panel */}
        <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyan-600" />
            </div>
            <h3 className="text-base font-bold">Veículo Elétrico</h3>
          </div>

          <label className="text-sm font-medium text-foreground block mb-2">Selecione o modelo</label>
          <select
            value={evId}
            onChange={(e) => setEvId(e.target.value)}
            className="w-full bg-white border border-cyan-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/30 mb-5"
          >
            {electricVehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.brand} {v.model} — {v.consumption}
              </option>
            ))}
          </select>

          <div className="bg-white rounded-xl p-4 border border-cyan-100 text-sm space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Consumo</span>
              <span className="font-semibold">{ev.consumption}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Preço</span>
              <span className="font-semibold">{ev.price}</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Custo da Energia (R$/kWh)</label>
              <span className="text-sm font-bold text-cyan-600 bg-cyan-100 px-3 py-1 rounded-full">
                R$ {energyPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <input
              type="range"
              min="0.40"
              max="2.00"
              step="0.01"
              value={energyPrice}
              onChange={(e) => setEnergyPrice(Number(e.target.value))}
              className="w-full slider-cyan"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>R$ 0,40</span><span>R$ 2,00</span>
            </div>
          </div>
        </div>

        {/* CV Panel */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
              <Fuel className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="text-base font-bold">Veículo a Combustão</h3>
          </div>

          <label className="text-sm font-medium text-foreground block mb-2">Selecione o modelo</label>
          <select
            value={cvId}
            onChange={(e) => setCvId(e.target.value)}
            className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 mb-5"
          >
            {combustionVehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.brand} {v.model} — {v.consumption}
              </option>
            ))}
          </select>

          <div className="bg-white rounded-xl p-4 border border-orange-100 text-sm space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Consumo</span>
              <span className="font-semibold">{cv.consumption}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Preço</span>
              <span className="font-semibold">{cv.price}</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Preço da Gasolina (R$/L)</label>
              <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                R$ {gasolinePrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <input
              type="range"
              min="4.00"
              max="9.00"
              step="0.01"
              value={gasolinePrice}
              onChange={(e) => setGasolinePrice(Number(e.target.value))}
              className="w-full slider-orange"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>R$ 4,00</span><span>R$ 9,00</span>
            </div>
          </div>
        </div>
      </div>

      {/* KM Slider */}
      <div className="bg-white border border-border rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold">Quilômetros por Mês</label>
          <span className="text-sm font-bold bg-secondary px-3 py-1 rounded-full">
            {kmPerMonth.toLocaleString("pt-BR")} km
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={kmPerMonth}
          onChange={(e) => setKmPerMonth(Number(e.target.value))}
          className="w-full slider-cyan"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>500 km</span><span>5.000 km</span>
        </div>
      </div>

      {/* Results */}
      <motion.div
        key={`${evId}-${cvId}-${kmPerMonth}-${gasolinePrice}-${energyPrice}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 text-center">
          <Zap className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">Custo Mensal — Elétrico</p>
          <p className="text-2xl font-black text-cyan-600">{fmt(results.evMonthlyCost)}</p>
        </div>

        <div className="bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-2xl p-5 text-center text-white shadow-lg shadow-cyan-500/20">
          <TrendingDown className="w-6 h-6 mx-auto mb-2 opacity-80" />
          <p className="text-xs text-white/70 mb-1">Economia Mensal</p>
          <p className="text-2xl font-black">{fmt(results.savings)}</p>
          <p className="text-xs text-white/60 mt-1">{results.savingsPercent}% menos</p>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-center">
          <Fuel className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">Custo Mensal — Combustão</p>
          <p className="text-2xl font-black text-orange-600">{fmt(results.cvMonthlyCost)}</p>
        </div>
      </motion.div>

      {/* Annual savings bar */}
      <div className="bg-white border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Economia anual estimada</p>
            <p className="text-xl font-black text-foreground">{fmt(results.annualSavings)}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center sm:text-right max-w-xs">
          Comparando <strong>{ev.brand} {ev.model}</strong> vs <strong>{cv.brand} {cv.model}</strong> rodando {kmPerMonth.toLocaleString("pt-BR")} km/mês
        </p>
      </div>

      <AnnualCostChart
        evMonthlyCost={results.evMonthlyCost}
        cvMonthlyCost={results.cvMonthlyCost}
        evLabel={`${ev.brand} ${ev.model}`}
        cvLabel={`${cv.brand} ${cv.model}`}
      />
    </section>
  );
}