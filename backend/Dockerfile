# Use uma imagem oficial do Node.js como base
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que sua aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["nodemon", "Controler.js"]
