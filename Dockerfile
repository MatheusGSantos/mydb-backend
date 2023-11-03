FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g prisma

RUN npx prisma generate

RUN npm run build

EXPOSE 8080

COPY entrypoint.sh /usr/src/app/

RUN chmod +x /usr/src/app/entrypoint.sh

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
