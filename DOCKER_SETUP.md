# Docker Setup Guide

This project includes Docker configuration for easy setup across different environments (Mac and Windows).

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- At least 4GB of RAM allocated to Docker

## Quick Start

### Using Docker Compose (Recommended)

1. **Build and start the containers:**

   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Client: http://localhost:5173
   - Server API: http://localhost:3000

3. **To stop the containers:**

   ```bash
   docker-compose down
   ```

### Using Docker Build (Alternative)

1. **Build the image:**

   ```bash
   docker build -t airline-voucher-seat .
   ```

2. **Run the container:**

   ```bash
   docker run -p 5173:5173 -p 3000:3000 -v $(pwd)/server/data:/app/server/data airline-voucher-seat
   ```

## Database Persistence

The Docker setup includes a named volume `airline-voucher-db` to persist the SQLite database across container restarts. Your data will be preserved even if you remove and recreate the containers.

To reset the database:
```bash
docker-compose down -v
```

## Environment Variables

The following environment variables are configured in `docker-compose.yml`:

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `file:/app/server/data/dev.db` | SQLite database path |
| `NODE_ENV` | `development` | Node environment |
| `PORT` | `3000` | Server port |
| `BUN_PORT` | `3000` | Bun server port |

## Troubleshooting

### Port already in use

If ports 3000 or 5173 are already in use on your host machine, modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "8080:5173"  # Change host port 8080 to container port 5173
  - "4000:3000"  # Change host port 4000 to container port 3000
```

### Database issues

If you encounter database errors, try resetting the database:

```bash
docker-compose down -v
docker-compose up --build
```

### View logs

```bash
docker-compose logs -f
```

### Access container shell (for debugging)

```bash
docker-compose exec app sh
```

## Development Mode

The Docker setup runs in development mode, which means:
- Both server and client restart automatically on code changes
- Hot Module Replacement (HMR) is enabled for the client

## Production Deployment

For production deployments, you would typically:
1. Build the client statically (`bun run build:client`)
2. Serve the built files from the server
3. Use a production database (PostgreSQL recommended)

This requires modifications to the Dockerfile and is beyond the scope of this quick setup guide.
