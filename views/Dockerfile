# Use uma imagem base do Node.js
FROM node:14

# Instale expo-cli globalmente
RUN npm install -g expo-cli

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho do contêiner
COPY . .

# Exponha a porta em que o Expo está rodando (ajuste se necessário)
EXPOSE 8081


# Comando para rodar o aplicativo
CMD ["expo", "start", "--tunnel"]
