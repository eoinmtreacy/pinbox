# frontend/Dockerfile
FROM node:16-alpine # placeholder node version, front-end lead advise

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

