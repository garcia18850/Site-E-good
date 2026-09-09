import {
  BarChart3,
  Bell,
  Building2,
  Car,
  ChevronRight,
  CircleDollarSign,
  Eye,
  LogOut,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

const inventory = [
  { name: "BYD Song Plus", type: "Híbrido plug-in", price: "R$ 239.800", status: "Ativo", color: "bg-emerald-100 text-emerald-700" },
  { name: "Volvo EX30", type: "100% elétrico", price: "R$ 249.900", status: "Ativo", color: "bg-cyan-100 text-cyan-700" },
  { name: "GWM Ora 03", type: "100% elétrico", price: "R$ 139.900", status: "Rascunho", color: "bg-amber-100 text-amber-700" },
];

const metrics = [
  { label: "Veículos publicados", value: "24", detail: "+3 este mês", icon: Car, color: "text-cyan-700 bg-cyan-100" },
  { label: "Visualizações", value: "1.284", detail: "+18% este mês", icon: Eye, color: "text-orange-700 bg-orange-100" },
  { label: "Leads recebidos", value: "38", detail: "12 aguardando retorno", icon: Users, color: "text-emerald-700 bg-emerald-100" },
  { label: "Valor em estoque", value: "R$ 4,8 mi", detail: "24 veículos ativos", icon: CircleDollarSign, color: "text-violet-700 bg-violet-100" },
];

export default function Dealership() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dealershipName = user?.tradeName || user?.name || "E-good Motors";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="text-2xl font-black tracking-tight text-cyan-700">E-good</Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <button type="button" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-cyan-700" aria-label="Notificações">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-orange-500" />
            </button>
            <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-cyan-200 hover:text-cyan-700">
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-cyan-700"><Building2 className="h-4 w-4" /> Painel da concessionária</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Olá, {dealershipName}.</h1>
            <p className="mt-2 text-slate-500">Acompanhe o desempenho do seu estoque e seus contatos.</p>
          </div>
          <button type="button" onClick={() => navigate("/")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-700 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-cyan-800">
            <Plus className="h-4 w-4" /> Cadastrar veículo
          </button>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, detail, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold text-slate-500">{label}</p><span className={`rounded-lg p-2 ${color}`}><Icon className="h-5 w-5" /></span></div>
              <p className="mt-5 text-2xl font-black text-slate-900">{value}</p>
              <p className="mt-1 text-sm text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-[0.12em] text-cyan-700">Seu estoque</p><h2 className="mt-1 text-xl font-black">Veículos recentes</h2></div><button type="button" onClick={() => navigate("/")} className="text-sm font-bold text-cyan-700 hover:text-cyan-900">Ver todos</button></div>
            <div className="divide-y divide-slate-100">
              {inventory.map(({ name, type, price, status, color }) => (
                <div key={name} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><Car className="h-5 w-5" /></div><div><p className="font-bold text-slate-900">{name}</p><p className="mt-1 text-sm text-slate-500">{type} · {price}</p></div></div><span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${color}`}>{status}</span></div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 p-6 text-white shadow-lg"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.12em] text-cyan-300">Desempenho</p><h2 className="mt-1 text-xl font-black">Visitas ao estoque</h2></div><BarChart3 className="h-6 w-6 text-cyan-300" /></div><div className="mt-8 flex items-end gap-2"><span className="text-4xl font-black">1.284</span><span className="mb-1 text-sm font-semibold text-emerald-300">+18%</span></div><div className="mt-6 flex h-24 items-end gap-2" aria-label="Gráfico de visitas nos últimos seis meses"><span className="h-[38%] flex-1 rounded-t bg-cyan-400/50" /><span className="h-[52%] flex-1 rounded-t bg-cyan-400/60" /><span className="h-[45%] flex-1 rounded-t bg-cyan-400/60" /><span className="h-[68%] flex-1 rounded-t bg-cyan-400/70" /><span className="h-[76%] flex-1 rounded-t bg-cyan-400/80" /><span className="h-full flex-1 rounded-t bg-cyan-300" /></div><div className="mt-3 flex justify-between text-xs text-slate-400"><span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Set</span></div></div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.12em] text-orange-600">Atendimento</p><h2 className="mt-1 text-xl font-black">Você tem 12 leads para responder</h2><p className="mt-2 text-sm text-slate-500">Responda rapidamente para aumentar suas chances de venda.</p></div><button type="button" onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-sm font-bold text-cyan-700 hover:text-cyan-900">Abrir contatos <ChevronRight className="h-4 w-4" /></button></div></section>

        <button type="button" onClick={() => navigate("/")} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-cyan-700"><Settings className="h-4 w-4" /> Configurações da conta</button>
      </main>
    </div>
  );
}
