FROM node:16.14.0
WORKDIR /app_frontend
COPY package.json .
COPY package-lock.json .
RUN npm install && npm cache clean --force 
COPY . .
EXPOSE 3000
CMD npm start
