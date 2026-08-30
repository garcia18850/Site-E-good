import { CheckCircle, Zap, Fuel } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VehicleCard({ vehicle, isSelected, onSelect }) {
  const isEV = vehicle.type === "eletrico";

  return (
    <div
      onClick={() => onSelect(vehicle.id)}
      className={`
        group relative bg-white rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300 hover:-translate-y-1
        ${isSelected
          ? "ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/10"
          : "shadow-md shadow-black/5 hover:shadow-lg hover:shadow-black/8 border border-border"
        }
      `}
    >
      {/* Year tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`
          text-xs font-bold px-2.5 py-1 rounded-full
          ${isEV ? "bg-cyan-500 text-white" : "bg-orange-500 text-white"}
        `}>
          {vehicle.year}
        </span>
      </div>

      {/* Selection check */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10">
          <CheckCircle className="w-6 h-6 text-cyan-500 fill-cyan-100" />
        </div>
      )}

      {/* Image area */}
      <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-6 pt-10 flex items-center justify-center h-44">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `<div class="flex flex-col items-center gap-2 text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg><span class="text-xs">${vehicle.brand} ${vehicle.model}</span></div>`;
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {vehicle.brand}
            </p>
            <h3 className="text-base font-bold text-foreground leading-tight">
              {vehicle.model}
            </h3>
          </div>
          <p className="text-sm font-bold text-foreground whitespace-nowrap">
            {vehicle.price}
          </p>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          {isEV ? (
            <Zap className="w-3.5 h-3.5 text-cyan-500" />
          ) : (
            <Fuel className="w-3.5 h-3.5 text-orange-500" />
          )}
          <span className={`text-xs font-semibold ${isEV ? "text-cyan-600" : "text-orange-600"}`}>
            {vehicle.consumption}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {vehicle.tags.map((tag, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}