# Use uma imagem oficial do Node.js como base
FROM node:20

# Instale o Expo CLI globalmente
RUN npm install -g expo-cli

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que sua aplicação irá rodar (normalmente 19000 para Expo)
EXPOSE 8081

# Comando para iniciar a aplicação
CMD ["npx", "expo", "start"]
