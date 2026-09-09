import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, Building2, User } from "lucide-react";
import { useAuth } from "../lib/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [accountType, setAccountType] = useState("user");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const name = formData.email.split("@")[0].replace(/[._-]+/g, " ");
      const formattedName = name.replace(/\b\w/g, (letter) => letter.toUpperCase());
      const isDealership = accountType === "dealership";

      login("mock-token", {
        id: isDealership ? "test-dealership" : "test-user",
        name: isDealership ? "E-good Motors" : formattedName || "Usuário E-good",
        email: formData.email,
        role: isDealership ? "DEALERSHIP" : "user",
        tradeName: isDealership ? "E-good Motors" : undefined,
      });
      navigate(isDealership ? "/concessionaria" : "/usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-sm border border-border relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-t-2xl"></div>

        <div className="mb-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Voltar ao início
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h2>
          <p className="text-sm text-muted-foreground mt-1">Acesse sua conta para continuar</p>
        </div>

        <div className="flex bg-secondary p-1 rounded-lg mb-6">
          <button type="button" onClick={() => setAccountType("user")} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${accountType === "user" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <User className="w-4 h-4" /> Pessoa
          </button>
          <button type="button" onClick={() => setAccountType("dealership")} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${accountType === "dealership" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <Building2 className="w-4 h-4" /> Concessionária
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input required type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
          </div>

          {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">{error}</div>}

          <button type="submit" disabled={isLoading} className="w-full py-2.5 mt-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-70">
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro" className="text-cyan-600 font-semibold hover:underline">
            Crie aqui
          </Link>
        </div>
      </div>
    </div>
  );
}