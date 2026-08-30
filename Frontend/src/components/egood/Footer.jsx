import { Leaf, Zap, DollarSign, Car } from "lucide-react";

const students = [
  "Fernanda Kedouk",
  "Giovanni Valente",
  "Kauã Garcia",
  "Maria Eduarda",
  "Nicole Kerne",
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-10">
          <div className="max-w-sm">
            <h3 className="text-2xl font-black tracking-tight mb-3">E-good</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Faça a escolha consciente. Economize dinheiro e contribua para um planeta mais sustentável com veículos elétricos e energia solar.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {[
              { emoji: "🌍", label: "Sustentabilidade" },
              { emoji: "⚡", label: "Eficiência Energética" },
              { emoji: "💰", label: "Economia Comprovada" },
              { emoji: "🚗", label: "Todos os Carros do Brasil" },
            ].map((link, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <span>{link.emoji}</span>
                <span className="text-xs font-medium">{link.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="text-center mb-4">
            <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">
              Startup: Final Project
            </p>
            <p className="text-xs text-white/30 mb-3">Desenvolvido pelos alunos:</p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              {students.map((name, i) => (
                <span key={i} className="text-[11px] text-white/40 font-medium">
                  {name}{i < students.length - 1 ? " •" : ""}
                </span>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-white/25 mt-4">
            © 2026 E-good - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}