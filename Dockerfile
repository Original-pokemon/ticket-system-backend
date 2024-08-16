FROM node:lts-slim AS base

# Установка рабочей директории
WORKDIR /app

FROM base AS builder

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

RUN npx prisma generate

RUN npm run build

FROM base AS runner
RUN apt-get update -y
RUN apt-get install -y openssl

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/build ./build

# Указываем порт, который будет использован приложением
EXPOSE 8000

# Запуск приложения
CMD ["node", "./build/scripts/start.js"]

