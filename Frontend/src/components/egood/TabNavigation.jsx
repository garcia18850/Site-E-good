import { Car, BarChart3, Sun, Calculator, Code2 } from "lucide-react";

const tabs = [
  { id: "veiculos", label: "Veículos", icon: Car },
  { id: "comparacao", label: "Comparação", icon: BarChart3 },
  { id: "solar", label: "Solar", icon: Sun },
  { id: "calculadora", label: "Calculadora", icon: Calculator },
];

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div className="sticky top-4 z-50 flex justify-center px-4 py-6">
      <div className="inline-flex items-center gap-1 bg-white rounded-full p-1.5 shadow-lg shadow-black/5 border border-border">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                ${isActive
                  ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}