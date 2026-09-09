import express from 'express';
import authRoutes from './routes/auth.routes';
import systemRoutes from './routes/system.routes';

const app = express();

// Permite que o servidor entenda JSON no corpo das requisições
app.use(express.json());

// Registra os arquivos de rotas
app.use('/api/auth', authRoutes);
app.use('/api/system', systemRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});