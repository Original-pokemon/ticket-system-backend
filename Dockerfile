FROM node:18

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Сборка TypeScript
RUN npx prisma generate
RUN npm run build

# Указываем порт, который будет использован приложением
EXPOSE 8000

# Запуск приложения
CMD ["npm", "start"]

