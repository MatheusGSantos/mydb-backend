#!/bin/sh

npx prisma migrate dev

npx prisma db seed

npm start
