import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import PageNotFound from "./lib/PageNotFound";
import { AuthProvider } from "./lib/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import Dealership from "./pages/Dealership";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <Router>
          <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Autenticação */}
          <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />

            <Route element={<ProtectedRoute unauthenticatedElement={<Login />} allowedRoles={["user"]} />}>
              <Route path="/usuario" element={<User />} />
            </Route>
            <Route element={<ProtectedRoute unauthenticatedElement={<Login />} allowedRoles={["DEALERSHIP"]} />}>
              <Route path="/concessionaria" element={<Dealership />} />
            </Route>

          {/* Página não encontrada */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}