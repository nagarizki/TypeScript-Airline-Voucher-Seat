# Use Bun's official image
FROM oven/bun:1-alpine

# Install required packages for native modules and development
RUN apk add --no-cache \
    git \
    openssl \
    ca-certificates \
    tzdata \
    bash

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lock turbo.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/
COPY shared/package.json ./shared/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy all source code
COPY . .

# Set environment variable for Prisma (must be set before prisma generate)
ENV DATABASE_URL="file:./server/data/dev.db"

# Build shared package first (required by server)
RUN bun --filter shared build

# Build server package
RUN bun --filter server build

# Generate Prisma client
RUN cd server && bunx prisma generate

# Create database directory
RUN mkdir -p server/data

# Run Prisma migrations (ignore errors if already migrated)
RUN cd server && bunx prisma migrate deploy || echo "Migration may already be applied"

# Seed the database (optional - uncomment if needed)
# RUN cd server && bunx prisma db seed || echo "Seeding may already be done"

# Expose ports (Server: 3000, Client: 5173)
EXPOSE 3000 5173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/hello || exit 1

# Start both server and client using a shell script
# This runs in development mode with hot reload
CMD sh -c "\
    echo 'Starting server...' && \
    bun run --filter server dev & \
    echo 'Starting client...' && \
    bun run --filter client dev & \
    wait"
