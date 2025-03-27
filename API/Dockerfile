# Usa una imagen oficial de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del package.json e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código de la API
COPY . .

# Expone el puerto en el que corre la API
EXPOSE 3000

# Comando para iniciar la API
CMD ["node", "app.js"]
