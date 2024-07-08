FROM node:20-slim
WORKDIR dist/src
COPY package*.json ./
RUN npm install --only=production
COPY . ./
CMD [ "node", "main.js" ]