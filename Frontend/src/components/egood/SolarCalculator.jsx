import { useState } from "react";
import { Sun, Calculator, Zap, DollarSign, LayoutGrid, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function formatBR(value) {
  return String(value).replace(".", ",");
}

function parseBR(value) {
  return parseFloat(String(value).replace(",", ".")) || 0;
}

export default function SolarCalculator() {
  const [kmPerDay, setKmPerDay] = useState(50);
  const [consumptionKwh, setConsumptionKwh] = useState("14,5");
  const [energyCost, setEnergyCost] = useState("0,85");
  const [sunHours, setSunHours] = useState(5);
  const [panelPower, setPanelPower] = useState("550");
  const [systemCost, setSystemCost] = useState("15000");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const consumption = parseBR(consumptionKwh);
    const costKwh = parseBR(energyCost);
    const panelW = parseBR(panelPower);
    const totalCost = parseBR(systemCost);

    // Daily energy needed
    const dailyKwh = (kmPerDay * consumption) / 100;
    // System size needed
    const systemKw = dailyKwh / sunHours;
    // Number of panels
    const panelKw = panelW / 1000;
    const numPanels = Math.ceil(systemKw / panelKw);
    // Monthly savings
    const monthlyKwh = dailyKwh * 30;
    const monthlySavings = monthlyKwh * costKwh;
    // Payback
    const paybackMonths = totalCost / monthlySavings;
    const paybackYears = paybackMonths / 12;

    setResult({
      dailyKwh: dailyKwh.toFixed(1),
      systemKw: systemKw.toFixed(2),
      numPanels,
      monthlyKwh: monthlyKwh.toFixed(0),
      monthlySavings: monthlySavings.toFixed(2),
      paybackMonths: Math.ceil(paybackMonths),
      paybackYears: paybackYears.toFixed(1),
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
          <Sun className="w-4 h-4" />
          Energia Solar
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Calculadora de Sistema Solar
        </h2>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Descubra quantos painéis solares você precisa para carregar seu veículo elétrico
        </p>
      </div>

      {/* Calculator Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Vehicle Data Panel */}
        <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-100">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-cyan-600" />
            <h3 className="text-base font-bold text-foreground">Dados do Veículo</h3>
          </div>

          {/* KM per day slider */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-foreground">Quilômetros por Dia</label>
              <span className="text-sm font-bold text-cyan-600 bg-cyan-100 px-3 py-1 rounded-full">
                {kmPerDay} km
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              value={kmPerDay}
              onChange={(e) => setKmPerDay(Number(e.target.value))}
              className="w-full slider-cyan"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>10 km</span>
              <span>200 km</span>
            </div>
          </div>

          {/* Consumption */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground block mb-2">
              Consumo do Veículo (kWh/100km)
            </label>
            <input
              type="text"
              value={consumptionKwh}
              onChange={(e) => setConsumptionKwh(e.target.value)}
              className="w-full bg-white border border-cyan-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all"
              placeholder="14,5"
            />
          </div>

          {/* Energy cost */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Custo da Energia (R$/kWh)
            </label>
            <input
              type="text"
              value={energyCost}
              onChange={(e) => setEnergyCost(e.target.value)}
              className="w-full bg-white border border-cyan-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 transition-all"
              placeholder="0,85"
            />
          </div>
        </div>

        {/* Solar System Panel */}
        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
          <div className="flex items-center gap-2 mb-6">
            <Sun className="w-5 h-5 text-orange-600" />
            <h3 className="text-base font-bold text-foreground">Sistema Solar</h3>
          </div>

          {/* Sun hours slider */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-foreground">Horas de Sol por Dia</label>
              <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                {sunHours}h
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="0.5"
              value={sunHours}
              onChange={(e) => setSunHours(Number(e.target.value))}
              className="w-full slider-orange"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>2h</span>
              <span>10h</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Média no Brasil: 4 a 6 horas. Consulte a irradiação da sua região.
            </p>
          </div>

          {/* Panel power */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground block mb-2">
              Potência por Painel (W)
            </label>
            <input
              type="text"
              value={panelPower}
              onChange={(e) => setPanelPower(e.target.value)}
              className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
              placeholder="550"
            />
          </div>

          {/* System cost */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Custo do Sistema (R$)
            </label>
            <input
              type="text"
              value={systemCost}
              onChange={(e) => setSystemCost(e.target.value)}
              className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
              placeholder="15.000"
            />
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculate}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base py-4 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-3"
      >
        <Calculator className="w-5 h-5" />
        Calcular Sistema Solar
      </button>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            <ResultCard
              icon={Zap}
              label="Energia Diária"
              value={`${formatBR(result.dailyKwh)} kWh`}
              color="cyan"
            />
            <ResultCard
              icon={LayoutGrid}
              label="Painéis Necessários"
              value={`${result.numPanels} painéis`}
              color="orange"
            />
            <ResultCard
              icon={DollarSign}
              label="Economia Mensal"
              value={`R$ ${parseBR(result.monthlySavings).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
              color="cyan"
            />
            <ResultCard
              icon={TrendingUp}
              label="Retorno do Investimento"
              value={`${formatBR(result.paybackYears)} anos`}
              color="orange"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ResultCard({ icon: Icon, label, value, color }) {
  const colorClasses = color === "cyan"
    ? "bg-cyan-50 border-cyan-100 text-cyan-600"
    : "bg-orange-50 border-orange-100 text-orange-600";

  return (
    <div className={`rounded-2xl border p-5 text-center ${colorClasses}`}>
      <Icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
      <p className="text-[11px] text-muted-foreground font-medium mb-1">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}