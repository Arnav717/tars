# Development Environment Dockerfile for TARS
# This Dockerfile sets up a complete development environment for Tauri + Rust + Node.js

FROM ubuntu:22.04

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Set up basic environment
ENV RUST_VERSION=stable
ENV NODE_VERSION=20.x

# Install system dependencies required for Tauri development
RUN apt-get update && apt-get install -y \
    # Build essentials
    build-essential \
    curl \
    wget \
    git \
    # Tauri dependencies
    libwebkit2gtk-4.0-dev \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    libsoup2.4-dev \
    # Additional utilities
    pkg-config \
    file \
    # Cleanup
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain ${RUST_VERSION}
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm (faster than npm)
RUN npm install -g pnpm

# Verify installations
RUN rustc --version && \
    cargo --version && \
    node --version && \
    npm --version && \
    pnpm --version

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install Node.js dependencies
RUN pnpm install || npm install

# Copy Rust/Cargo files
COPY src-tauri/Cargo.toml src-tauri/Cargo.lock* ./src-tauri/

# Pre-fetch Rust dependencies (optional, for better caching)
WORKDIR /app/src-tauri
RUN cargo fetch || true

# Back to main directory
WORKDIR /app

# Copy the rest of the application
COPY . .

# Expose port for development server (if using Vite/webpack dev server)
EXPOSE 1420

# Default command - run Tauri in development mode
CMD ["pnpm", "tauri", "dev"]
