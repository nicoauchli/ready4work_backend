# Verwende ein Node-Image als Basis für die Backend-Anwendung
FROM node:20-alpine

# Arbeitsverzeichnis erstellen und setzen
WORKDIR /app

# Package.json und Package-lock.json kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Den gesamten Source-Code kopieren
COPY . .

# Nest.js-Anwendung bauen
RUN npm run build

# Der Port, auf dem das Backend läuft (standardmäßig 3000)
EXPOSE 3000

# Starten der Nest.js-Anwendung
CMD ["npm", "run", "start:prod"]
