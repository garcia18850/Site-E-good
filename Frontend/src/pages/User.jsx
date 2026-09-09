import {
  ArrowRight,
  BarChart3,
  Car,
  ChevronRight,
  Leaf,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

const recommendations = [
  {
    icon: Car,
    title: "Explore veículos elétricos",
    description: "Encontre o modelo que combina com a sua rotina.",
    action: "Ver veículos",
  },
  {
    icon: BarChart3,
    title: "Compare suas opções",
    description: "Coloque lado a lado consumo, preço e autonomia.",
    action: "Começar comparação",
  },
  {
    icon: Leaf,
    title: "Calcule sua economia",
    description: "Descubra quanto você pode economizar por ano.",
    action: "Calcular agora",
  },
];

export default function User() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const displayName = user?.name || "Usuário E-good";
  const firstName = displayName.split(" ")[0];
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="text-2xl font-black tracking-tight text-cyan-700">
            E-good
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link to="/" className="hidden text-sm font-semibold text-slate-600 transition-colors hover:text-cyan-700 sm:block">
              Explorar veículos
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-cyan-200 hover:text-cyan-700"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[32px] border-cyan-400/20" />
          <div className="absolute -bottom-32 right-24 h-56 w-56 rounded-full border-[24px] border-orange-300/10" />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                <Sparkles className="h-4 w-4" /> Seu espaço E-good
              </p>
              <h1 className="max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
                Olá, {firstName}.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
                Continue sua jornada para escolher um veículo mais inteligente e sustentável.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-lg font-black text-slate-900">
                {initials || "EG"}
              </div>
              <div>
                <p className="font-bold">{displayName}</p>
                <p className="mt-1 text-sm text-slate-300">{user?.email}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Perfil</p>
              <UserRound className="h-5 w-5 text-cyan-600" />
            </div>
            <p className="mt-3 text-xl font-black text-slate-900">Completo</p>
            <p className="mt-1 text-sm text-slate-500">Seus dados estão prontos</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Simulações</p>
              <BarChart3 className="h-5 w-5 text-orange-500" />
            </div>
            <p className="mt-3 text-xl font-black text-slate-900">Comece agora</p>
            <p className="mt-1 text-sm text-slate-500">Compare seus próximos carros</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Modo de teste</p>
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="mt-3 text-xl font-black text-slate-900">Ativo</p>
            <p className="mt-1 text-sm text-slate-500">Dados salvos neste navegador</p>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-cyan-700">Próximos passos</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">O que você quer fazer?</h2>
            </div>
            <button type="button" onClick={() => navigate("/")} className="hidden items-center gap-1 text-sm font-bold text-cyan-700 hover:text-cyan-900 sm:flex">
              Ver tudo <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {recommendations.map(({ icon: Icon, title, description, action }, index) => (
              <button
                key={title}
                type="button"
                onClick={() => navigate("/")}
                className="group text-left rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${index === 1 ? "bg-orange-100 text-orange-600" : index === 2 ? "bg-emerald-100 text-emerald-600" : "bg-cyan-100 text-cyan-700"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-extrabold text-slate-900">{title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-cyan-700">
                  {action}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </section>

        <button type="button" onClick={() => navigate("/")} className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-cyan-700">
          <Settings className="h-4 w-4" /> Ajustes e preferências em breve
        </button>
      </main>
    </div>
  );
}
