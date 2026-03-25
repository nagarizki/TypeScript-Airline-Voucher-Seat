# Airline Voucher & Seat Assignment

A full-stack TypeScript monorepo application for airline voucher management and seat assignment, built with Bun, Hono, Vite, React, and Prisma.

## Features

- **Voucher Management**: Generate and manage airline vouchers
- **Seat Assignment**: Interactive seat selection for flights
- **Flight Management**: Browse available flights with details
- **Full-Stack TypeScript**: End-to-end type safety between client and server
- **RESTful API**: Clean API design with Hono framework

## Tech Stack

### Core Technologies
- **[Bun](https://bun.sh)** - JavaScript runtime and package manager
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Turbo](https://turbo.build)** - Monorepo build orchestration and caching

### Backend
- **[Hono](https://hono.dev)** - Lightweight web framework for REST APIs
- **[Prisma](https://www.prisma.io/)** - Type-safe ORM for database operations
- **[SQLite](https://www.sqlite.org/)** - Embedded database (stored in Docker volume, not in repo)

### Frontend
- **[React](https://react.dev)** - UI library for building user interfaces
- **[Vite](https://vitejs.dev)** - Fast frontend build tool
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing for React
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework

### Additional Libraries
- **[Biome](https://biomejs.dev)** - Fast linter and formatter
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Password hashing

## Prerequisites

Before running this project, ensure you have the following installed:

### Required
- **[Bun](https://bun.sh)** (v1.2.4 or higher) - Runtime and package manager
- **Git** - Version control system

### Optional (for development)
- **[Node.js](https://nodejs.org/)** (v18 or higher) - Alternative runtime
- **[Docker](https://www.docker.com/)** (v20 or higher) - Containerization platform
- **[Docker Desktop](https://www.docker.com/products/docker-desktop)** - Docker GUI for Mac/Windows

## Project Structure

```
.
├── client/                    # React frontend application
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── layouts/           # Layout components
│   │   ├── routes/            # Route definitions
│   │   └── lib/               # Utility functions
│   ├── public/                # Static assets
│   └── package.json
├── server/                    # Hono backend API
│   ├── src/
│   │   ├── routes/            # API route handlers
│   │   ├── db/                # Database layer
│   │   └── index.ts           # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── migrations/         # Database migrations
│   └── package.json
├── shared/                    # Shared TypeScript definitions
│   └── src/types/             # Type definitions
├── package.json               # Root workspace configuration
└── turbo.json                 # Turbo build configuration
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd airline-voucher-seat
```

### 2. Install Dependencies

This project uses Bun as the package manager. Install all workspace dependencies:

```bash
# Install all dependencies (root + client + server + shared)
bun install
```

This will automatically:
- Install root workspace dependencies
- Install client dependencies
- Install server dependencies (including Prisma)
- Install shared package dependencies
- Build shared and server packages

### 3. Database Setup

The project uses SQLite with Prisma ORM. The database is stored in a Docker volume, not in the repository - this ensures data persistence and cross-platform compatibility.

#### Option A: Docker (Recommended)

Start the application with Docker Compose:

```bash
# Build and start the containers
docker-compose up --build
```

The SQLite database will be stored in a Docker named volume (`airline-voucher-db`), not in the repository. The Dockerfile automatically runs Prisma generate and migrations during build.

#### Option B: Local SQLite (Not Recommended)

If you want to run SQLite locally without Docker, update `server/.env`:

```env
DATABASE_URL="file:./vouchers.db"
```

> ⚠️ **Warning**: Storing the database file in the repository is not safe and may cause issues with cross-platform development.

The project uses SQLite with Prisma ORM. The database is automatically set up during installation:

```bash
# Generate Prisma Client

cd server
bunx prisma generate

# Run Database Migrations (from server directory)

bunx prisma migrate dev

# Run Prisma Seeder (from server directory)

bunx prisma db seed

```

## Running the Application

### Development Mode (Recommended)

Run both backend and frontend simultaneously with hot reload:

```bash
# Run all workspaces in development mode (run from parent directory)
bun run dev
```

# default login account

email : alice@mail.com (or any other email from the seeder)
password : password

This will start:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

### Running Individual Services

#### Backend Only

```bash
# Run server with hot reload
bun run dev:server
```

The API will be available at http://localhost:3000

#### Frontend Only

```bash
# Run client with hot reload
bun run dev:client
```

The application will be available at http://localhost:5173

## Building for Production

### Build All Packages

```bash
bun run build
```

This will build:
- `shared/` - Shared TypeScript types
- `server/` - Backend API
- `client/` - Frontend static files

### Build Individual Packages

```bash
# Build client only
bun run build:client

# Build server only
bun run build:server
```

## Additional Commands

```bash
# Lint all workspaces
bun run lint

# Format code
bun run format

# Type check all workspaces
bun run type-check

# Run tests
bun run test
```

## Docker Setup (Optional)

For containerized deployment using Docker:

### Prerequisites
- Docker Desktop installed and running
- At least 4GB of RAM allocated to Docker

### Quick Start

```bash
# Build and start containers
docker-compose up --build
```

### Access the Application
- **Client**: http://localhost:5173
- **Server API**: http://localhost:3000

### Stopping Containers

```bash
docker-compose down
```

### Reset Database

```bash
docker-compose down -v
docker-compose up --build
```

For more detailed Docker instructions, see [DOCKER_SETUP.md](DOCKER_SETUP.md).

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/flights` | Get all available flights |
| GET | `/api/flights/search` | Search flights by query |
| GET | `/api/flights/:flightNumber` | Get flight by flight number |
| GET | `/api/flights/:flightNumber/:date` | Get flight by number and date |
| POST | `/api/flights` | Create new flight |
| POST | `/api/seats/assign` | Assign seat to flight |
| POST | `/api/voucher/check` | Check voucher validity |
| POST | `/api/voucher/generate` | Generate new voucher |
| GET | `/api/aircraft-types` | Get all aircraft types |
| GET | `/api/crew` | Get all crew members |
| POST | `/login` | User authentication |

## Environment Variables

### Server (.env)

```env
# SQLite database (stored in Docker volume, not in repo)
DATABASE_URL="file:/app/server/data/vouchers.db"

PORT=3000
BUN_PORT=3000
```

### Client (.env)

```env
VITE_SERVER_URL=http://localhost:3000
```

## Troubleshooting

### Port Already in Use

If ports 3000 or 5173 are already in use:

```bash
# Find process using the port
lsof -i :3000
lsof -i :5173

# Kill the process
kill <PID>
```

### Database Issues

Reset the database (remove and recreate):

```bash
cd server
bunx prisma migrate reset
```

### Node Modules Issues

Clean and reinstall:

```bash
rm -rf node_modules
rm -rf client/node_modules
rm -rf server/node_modules
rm -rf shared/node_modules
bun install
```

## Learn More

- [Bun Documentation](https://bun.sh/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/learn)
- [Hono Documentation](https://hono.dev/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turbo Documentation](https://turbo.build/docs)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com/docs)
