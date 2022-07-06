FROM node:16.14.0
WORKDIR /app_backend
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD npm start
