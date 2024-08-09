FROM node:18

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install --production

# Копирование исходного кода
COPY . .

# Сборка TypeScript
RUN npm run build
RUN npx prisma generate

# Указываем порт, который будет использован приложением
EXPOSE 8000

# Запуск приложения
CMD ["npm", "start"]

