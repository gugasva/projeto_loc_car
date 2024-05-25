FROM nginx

ENV APP_HOME /var/www/html

# Copia todo o conteúdo do diretório C:/Projeto para dentro do contêiner
COPY . ${APP_HOME}

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
