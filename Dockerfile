# Estágio 1: Build (Instalação e Compilação)
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro (isso ajuda no cache do Docker)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o resto do código fonte para dentro do container
COPY . .

# Roda o comando de build para gerar os arquivos otimizados na pasta dist
RUN npm run build

# ---------------------------------------------------

# Estágio 2: Produção (Servir os arquivos estáticos)
# Usamos o Nginx para servir os arquivos estáticos gerados no passo anterior
FROM nginx:alpine

# Remove os arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia apenas os arquivos otimizados (pasta dist) do "Estágio 1"
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80 do container
EXPOSE 80

# Comando padrão para manter o Nginx rodando em primeiro plano
CMD ["nginx", "-g", "daemon off;"]