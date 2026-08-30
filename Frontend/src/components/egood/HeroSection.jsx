import { Car, BarChart3, Sun, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  { icon: Car, label: "Todos os Carros do Brasil" },
  { icon: BarChart3, label: "Comparação Completa" },
  { icon: Sun, label: "Energia Solar" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700 text-white">
      
      {/* ========================================== */}
      {/* HEADER / BARRA DE NAVEGAÇÃO NO TOPO */}
      {/* ========================================== */}
      <header className="relative z-20 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <Link to="/" className="text-2xl font-black tracking-tight text-white hover:text-white/90 transition-colors">
          E-good
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
          >
            Entrar
          </Link>
          <Link 
            to="/cadastro" 
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-cyan-700 text-sm font-bold rounded-full hover:bg-cyan-50 transition-transform hover:scale-105 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Criar Conta</span>
            <span className="sm:hidden">Criar</span>
          </Link>
        </div>
      </header>

      {/* Elementos decorativos do fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5" />
      </div>

      {/* Conteúdo principal do Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-20 pt-12 sm:pt-16 sm:pb-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-7xl font-black tracking-tight mb-4 text-white"
        >
          E-good
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-2xl font-semibold text-white/90 mb-3"
        >
          A escolha inteligente para o futuro sustentável
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-12"
        >
          Compare veículos elétricos e a combustão. Calcule seu sistema solar ideal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-5 py-3 border border-white/30 shadow-sm"
            >
              <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center">
                <f.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{f.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}