import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Building2, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [type, setType] = useState("user");
  const [formData, setFormData] = useState({ firstName: "", lastName: "", tradeName: "", document: "", email: "", password: "" });
  const [error, setError] = useState("");

  const isPasswordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordStrong) {
      setError("A senha precisa ser mais forte.");
      return;
    }

    const endpoint = type === "user" ? "http://localhost:3000/api/register/user" : "http://localhost:3000/api/register/company";
    const payload = type === "user" 
      ? { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, password: formData.password }
      : { tradeName: formData.tradeName, document: formData.document, email: formData.email, password: formData.password, type: "DEALERSHIP" };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        const errData = await response.json();
        setError(errData.error || "Erro ao cadastrar.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
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

        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Criar sua Conta</h2>

        <div className="flex bg-secondary p-1 rounded-lg mb-6">
          <button type="button" onClick={() => setType("user")} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${type === "user" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <User className="w-4 h-4" /> Pessoa
          </button>
          <button type="button" onClick={() => setType("company")} className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${type === "company" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <Building2 className="w-4 h-4" /> Concessionária
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "user" ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Nome</label>
                <input required type="text" name="firstName" onChange={handleChange} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Sobrenome</label>
                <input required type="text" name="lastName" onChange={handleChange} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground outline-none" />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Nome da Empresa</label>
                <input required type="text" name="tradeName" onChange={handleChange} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">CNPJ</label>
                <input required type="text" name="document" onChange={handleChange} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground outline-none" />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium mb-1 text-foreground">E-mail</label>
            <input required type="email" name="email" onChange={handleChange} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground outline-none" />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 text-foreground">Senha</label>
            <input required type="password" name="password" onChange={handleChange} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground outline-none mb-1" />
            {formData.password.length > 0 && (
              <div className={`text-xs flex items-center gap-1 ${isPasswordStrong ? "text-green-600" : "text-orange-500"}`}>
                {isPasswordStrong ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {isPasswordStrong ? "Senha forte" : "Mín. 8 caracteres, maiúscula, número e símbolo (@$!%*?&)"}
              </div>
            )}
          </div>

          {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">{error}</div>}

          <button type="submit" disabled={formData.password.length > 0 && !isPasswordStrong} className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
            Cadastrar
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-cyan-600 font-semibold hover:underline">
            Entre aqui
          </Link>
        </div>
      </div>
    </div>
  );
}