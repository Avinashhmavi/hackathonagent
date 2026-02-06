#!/bin/bash

# Script to run docker-compose with automatic detection of command format

# Check if docker compose (plugin) is available
if docker compose version &> /dev/null; then
    echo "Using 'docker compose' (plugin)"
    DOCKER_COMPOSE_CMD="docker compose"
# Check if docker-compose (standalone) is available
elif docker-compose version &> /dev/null; then
    echo "Using 'docker-compose' (standalone)"
    DOCKER_COMPOSE_CMD="docker-compose"
else
    echo "Error: Neither 'docker compose' nor 'docker-compose' found!"
    echo "Please install docker-compose:"
    echo "  sudo curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose"
    echo "  sudo chmod +x /usr/local/bin/docker-compose"
    exit 1
fi

# Parse command line arguments
case "$1" in
    "dev")
        echo "Starting development environment..."
        $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml up --build
        ;;
    "build")
        echo "Building containers..."
        $DOCKER_COMPOSE_CMD build
        ;;
    "up")
        echo "Starting production environment..."
        $DOCKER_COMPOSE_CMD up --build
        ;;
    "down")
        echo "Stopping containers..."
        $DOCKER_COMPOSE_CMD down
        ;;
    "logs")
        echo "Showing logs..."
        $DOCKER_COMPOSE_CMD logs -f
        ;;
    *)
        echo "Usage: ./run.sh [dev|build|up|down|logs]"
        echo ""
        echo "Commands:"
        echo "  dev   - Start development environment"
        echo "  build - Build containers"
        echo "  up    - Start production environment"
        echo "  down  - Stop containers"
        echo "  logs  - Show container logs"
        exit 1
        ;;
esac

