import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart2 } from "lucide-react";

const MONTHS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const fmt = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  return (
    <div className="bg-white border border-border rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-bold">{fmt(p.value)}</span>
        </div>
      ))}
      {payload.length === 2 && (
        <p className="mt-2 text-xs text-cyan-600 font-semibold border-t border-border pt-2">
          Economia: {fmt(payload[1].value - payload[0].value)}
        </p>
      )}
    </div>
  );
};

export default function AnnualCostChart({ evMonthlyCost, cvMonthlyCost, evLabel, cvLabel }) {
  const data = useMemo(() =>
    MONTHS_PT.map((month) => ({
      month,
      [evLabel]: Math.round(evMonthlyCost),
      [cvLabel]: Math.round(cvMonthlyCost),
    })),
    [evMonthlyCost, cvMonthlyCost, evLabel, cvLabel]
  );

  const fmt = (v) => `R$${(v / 1000).toFixed(1)}k`;

  return (
    <div className="bg-white border border-border rounded-2xl p-6 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-cyan-100 flex items-center justify-center">
          <BarChart2 className="w-4 h-4 text-cyan-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">Custo Mensal ao Longo do Ano</h3>
          <p className="text-xs text-muted-foreground">Comparação mês a mês — valores em R$</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,15%,92%)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "hsl(215,10%,50%)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={fmt}
            tick={{ fontSize: 11, fill: "hsl(215,10%,50%)" }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(210,15%,96%)", radius: 6 }} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            iconType="circle"
            iconSize={8}
          />
          <Bar dataKey={evLabel} fill="hsl(192,85%,45%)" radius={[6, 6, 0, 0]} maxBarSize={40} />
          <Bar dataKey={cvLabel} fill="hsl(28,90%,55%)" radius={[6, 6, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 bg-cyan-50 border border-cyan-100 rounded-xl px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground mb-0.5">Total anual — Elétrico</p>
          <p className="text-lg font-black text-cyan-600">
            {(evMonthlyCost * 12).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="flex-1 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground mb-0.5">Total anual — Combustão</p>
          <p className="text-lg font-black text-orange-600">
            {(cvMonthlyCost * 12).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="flex-1 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl px-4 py-3 text-center text-white">
          <p className="text-xs text-white/70 mb-0.5">Economia total no ano</p>
          <p className="text-lg font-black">
            {((cvMonthlyCost - evMonthlyCost) * 12).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </div>
  );
}