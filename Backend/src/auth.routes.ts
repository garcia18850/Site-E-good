import { Router } from 'express';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const router = Router();
// const prisma = new PrismaClient();

// Rota para Cadastrar Pessoa Normal
router.post('/register/user', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Tentativa de cadastro (Usuário):", { name, email });

    /* --- CÓDIGO COM BANCO (Descomentar depois) ---
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });
    return res.status(201).json({ message: "Usuário criado com sucesso!", userId: user.id });
    ---------------------------------------------- */

    res.status(201).json({ message: "Usuário criado com sucesso (Modo Simulação)!", userId: "1" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno ao cadastrar usuário." });
  }
});

// Rota para Cadastrar Concessionária
router.post('/register/company', async (req, res) => {
  try {
    const { tradeName, document, email, password, type } = req.body;
    console.log("Tentativa de cadastro (Concessionária):", { tradeName, document, email });

    /* --- CÓDIGO COM BANCO (Descomentar depois) ---
    const existingCompany = await prisma.company.findFirst({
      where: { OR: [{ email }, { document }] }
    });
    if (existingCompany) {
      return res.status(400).json({ error: "E-mail ou CNPJ já cadastrado." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = await prisma.company.create({
      data: { tradeName, document, email, password: hashedPassword, type: type || "DEALERSHIP" }
    });
    return res.status(201).json({ message: "Concessionária criada com sucesso!", companyId: company.id });
    ---------------------------------------------- */

    res.status(201).json({ message: "Concessionária criada com sucesso (Modo Simulação)!", companyId: "1" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno ao cadastrar concessionária." });
  }
});

// Rota de Login Universal
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Tentativa de login para:", email);

    /* --- CÓDIGO COM BANCO (Descomentar depois) ---
    let user: any = null;
    let accountType = 'user';

    user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.company.findUnique({ where: { email } });
      accountType = 'company';
    }
    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, type: accountType }, 
      process.env.JWT_SECRET || 'chave-secreta-egood-local', 
      { expiresIn: '24h' }
    );
    return res.json({
      message: "Login realizado com sucesso",
      token,
      user: { id: user.id, email: user.email, name: user.name || user.tradeName, type: accountType }
    });
    ---------------------------------------------- */

    res.json({
      message: "Login realizado com sucesso (Modo Simulação)",
      token: "token-falso-exemplo-123",
      user: {
        id: "1",
        email: email,
        name: "Usuário Teste",
        type: "user"
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

export default router;