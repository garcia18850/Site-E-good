# 🚀 Site E-Good

Este repositório contém a estrutura unificada do projeto, dividida entre **Frontend** e **Backend**.

---

## 🛠️ Como Iniciar o Backend

Siga as instruções abaixo para configurar e rodar o servidor local da API.

### 1. Acessar a pasta do Backend
Abra o terminal do **Node.js** (ou o terminal de sua preferência) e navegue até a pasta do backend:
```bash
cd backend
```
*(Nota: Certifique-se de estar no diretório correto onde os arquivos do servidor estão localizados, como o `e-good-api`).*

### 2. Instalação das Dependências
> ⚠️ **IMPORTANTE:** Se você já baixou o projeto com a pasta `node_modules` inclusa, **pule este passo** e vá direto para o Passo 3. Realize os comandos abaixo **apenas se a pasta `node_modules` não estiver presente**.

```bash
# Inicializa o projeto Node.js
npm init -y

# Instala as dependências principais
npm install express cors dotenv jsonwebtoken bcrypt

# Instala as ferramentas de desenvolvimento e TypeScript
npm install -D typescript ts-node-dev @types/express @types/cors @types/node @types/jsonwebtoken @types/bcrypt prisma
```

### 3. Rodar o servidor em modo de desenvolvimento
Para iniciar o servidor localmente (localhost), execute o comando abaixo:
```bash
npm run dev
```
O servidor será iniciado e ficará ouvindo as requisições na porta configurada no seu código.
