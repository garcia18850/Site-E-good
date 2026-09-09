import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Aqui entrará a lógica do Prisma para validar o usuário
    res.status(200).json({ message: "Login realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // Aqui entrará a lógica do Prisma para salvar o usuário
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};