# Use Node.js LTS as base image
FROM node:22-slim AS base

# Install OpenSSL
RUN apt update && apt upgrade openssl -y

# Install pnpm
RUN npm install -g pnpm@latest

# Set working directory
WORKDIR /app

# Install dependencies first for layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]

