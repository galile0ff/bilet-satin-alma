# Build aşaması
FROM node:20-alpine AS builder
WORKDIR /app

# Paketleri yükle
COPY package*.json ./
RUN npm install

# Projeyi kopyala ve build et
COPY . .
RUN npm run build

# Production container
FROM node:20-alpine
WORKDIR /app

# Build çıktısını kopyala
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
