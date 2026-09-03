import express from 'express';
import cors from 'cors';
import systemRoutes from './routes/system.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// Middleware de segurança e leitura de JSON
app.use(cors());
app.use(express.json());

// Registrando os módulos de rotas com o prefixo /api
app.use('/api', systemRoutes);
app.use('/api', authRoutes);

// Define a porta e inicia o servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor do E-good rodando na porta ${PORT} com rotas modularizadas!`);
});