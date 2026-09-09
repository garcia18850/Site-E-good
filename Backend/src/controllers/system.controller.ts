import { Request, Response } from 'express';

export const getSystemStatus = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ 
      status: "online", 
      message: "API do E-good rodando perfeitamente!" 
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao verificar status do sistema." });
  }
};