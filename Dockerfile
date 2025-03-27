# Usa la imagen oficial de Nginx
FROM nginx:alpine

# Copia los archivos del frontend a la carpeta de Nginx
COPY . /usr/share/nginx/html

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
