# Calculator App

A React-based calculator application with comprehensive logging, error tracking, and Docker support.

## Features

- ✅ Functional calculator with basic operations
- ✅ Non-functional buttons for testing error logging
- ✅ Real-time log display panel
- ✅ Comprehensive error tracking
- ✅ Docker and Docker Compose support

## Quick Start

### Using Docker Compose (Recommended)

#### For systems with `docker-compose` (standalone):
```bash
# Build and start
sudo docker-compose up --build

# Run in detached mode
sudo docker-compose up -d --build

# View logs
sudo docker-compose logs -f

# Stop containers
sudo docker-compose down
```

#### For systems with `docker compose` (plugin):
```bash
# Build and start
docker compose up --build

# Run in detached mode
docker compose up -d --build

# View logs
docker compose logs -f

# Stop containers
docker compose down
```

The app will be available at **http://localhost:3000**

### Development Mode

#### Using docker-compose (standalone):
```bash
sudo docker-compose -f docker-compose.dev.yml up --build
```

#### Using docker compose (plugin):
```bash
docker compose -f docker-compose.dev.yml up --build
```

The dev server will be available at **http://localhost:5173**

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Installing Docker Compose

If you don't have docker-compose installed:

### Ubuntu/Debian:
```bash
# Install docker-compose standalone
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
```

### Or install Docker Compose V2 (plugin):
```bash
# For Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Verify installation
docker compose version
```

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── Calculator.jsx      # Main calculator component
│   │   └── LogDisplay.jsx      # Log display panel
│   ├── services/
│   │   └── logService.js       # Logging service
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── Dockerfile                  # Production Dockerfile
├── Dockerfile.dev              # Development Dockerfile
├── docker-compose.yml          # Production compose file
├── docker-compose.dev.yml      # Development compose file
└── nginx.conf                  # Nginx configuration
```

## Non-Functional Buttons

The following buttons are intentionally non-functional to demonstrate error logging:
- `±` (Plus/Minus)
- `%` (Percentage)
- `√` (Square Root)
- `x²` (Square)
- `1/x` (Reciprocal)
- `M+` (Memory Add)
- `ERROR` (Generates random errors)

## Logging

All activities are logged in real-time:
- ✅ Button clicks (functional and non-functional)
- ✅ Calculator operations and results
- ✅ Errors with stack traces
- ✅ App lifecycle events

Logs are displayed in the right panel (or below on mobile) with color coding:
- 🔵 Blue: Info logs
- 🟢 Green: Success logs
- 🟠 Orange: Warning logs
- 🔴 Red: Error logs

## Troubleshooting

### Docker Compose Command Not Found
- Try `docker-compose` (with hyphen) instead of `docker compose`
- Install docker-compose using the instructions above

### Port Already in Use
- Change the port mapping in `docker-compose.yml`:
  ```yaml
  ports:
    - "8080:80"  # Change 3000 to your preferred port
  ```

### Permission Denied
- Use `sudo` with docker commands if needed
- Add your user to docker group: `sudo usermod -aG docker $USER`

## License

MIT

