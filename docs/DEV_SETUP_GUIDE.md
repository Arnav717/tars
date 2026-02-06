# Development Setup Guide - TARS

This guide documents the complete development environment setup for TARS, including screenshots and proof of working configurations.

## 📋 Table of Contents

1. [Repository Structure](#repository-structure)
2. [Docker Setup](#docker-setup)
3. [Branching Strategy](#branching-strategy)
4. [Development Tools](#development-tools)
5. [Verification & Proof](#verification--proof)

---

## 1. Repository Structure

### Folder Organization

```
tars/
├── .github/                    # GitHub Actions & workflows
│   └── workflows/             # CI/CD pipeline configs
├── docs/                      # Documentation
├── src/                       # Frontend source
│   ├── index.html            # Main HTML
│   ├── main.js               # Frontend logic
│   └── style.css             # Styles
├── src-tauri/                # Rust backend
│   ├── src/
│   │   └── main.rs          # Rust entry point
│   ├── Cargo.toml           # Rust dependencies
│   └── tauri.conf.json      # Tauri config
├── tests/                    # Test files
├── .dockerignore            # Docker ignore rules
├── .gitignore               # Git ignore rules
├── Dockerfile               # Container definition
├── docker-compose.yml       # Docker Compose config
├── MOSCOW_PRIORITIZATION.md # Project priorities
├── package.json             # Node dependencies
├── vite.config.js          # Vite bundler config
└── README.md               # Main documentation
```

### .gitignore Configuration

Our `.gitignore` covers:
- ✅ Node.js dependencies (`node_modules/`)
- ✅ Rust build artifacts (`target/`, `*.rs.bk`)
- ✅ Tauri build outputs (`*.app`, `*.deb`, `*.exe`, etc.)
- ✅ OS-specific files (`.DS_Store`, `Thumbs.db`)
- ✅ IDE configurations (`.vscode/`, `.idea/`)
- ✅ Environment files (`.env`, `*.key`)
- ✅ Build distributions (`dist/`, `build/`)

---

## 2. Docker Setup

### Prerequisites

- **Docker Desktop** installed and running
- **Docker Compose** (included with Docker Desktop)

### Installation Steps

#### Linux (Fedora)
```bash
# Install Docker
sudo dnf install docker docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER
```

#### macOS / Windows
Download and install **Docker Desktop** from:
https://www.docker.com/products/docker-desktop

### Dockerfile Explanation

Our `Dockerfile` creates a complete development environment:

```dockerfile
FROM ubuntu:22.04

# Install system dependencies for Tauri
RUN apt-get update && apt-get install -y \
    build-essential curl wget git \
    libwebkit2gtk-4.0-dev libssl-dev libgtk-3-dev \
    libayatana-appindicator3-dev librsvg2-dev

# Install Rust (stable)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Install Node.js v20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app
EXPOSE 1420
CMD ["pnpm", "tauri", "dev"]
```

### Docker Compose Configuration

`docker-compose.yml` provides:
- **Development container** with hot-reload
- **Volume mounting** for live code updates
- **Port mapping** (1420 for Vite dev server)
- **Documentation server** (optional, port 8080)

### Build and Run Commands

```bash
# Build Docker image
docker build -t tars-dev .

# Run with Docker Compose (RECOMMENDED)
docker-compose up --build

# Run single container
docker run -it --rm \
  -v $(pwd):/app \
  -p 1420:1420 \
  tars-dev

# Stop all containers
docker-compose down

# View logs
docker-compose logs -f tars-dev

# Access shell in running container
docker exec -it tars-dev bash
```

### Expected Output

When running `docker-compose up --build`, you should see:

```
Creating network "tars_tars-network" with driver "bridge"
Creating volume "tars_node_modules" with default driver
Creating volume "tars_cargo-cache" with default driver
Building tars-dev...
Step 1/10 : FROM ubuntu:22.04
 ---> a8780b506fa4
...
Successfully built abc123def456
Successfully tagged tars-dev:latest
Creating tars-dev ... done
Attaching to tars-dev
tars-dev | 
tars-dev | > tars@0.1.0 tauri:dev
tars-dev | > tauri dev
tars-dev |
tars-dev | Running beforeDevCommand: npm run dev
tars-dev | VITE v5.0.0  ready in 234 ms
tars-dev | ➜  Local:   http://localhost:1420/
tars-dev | ➜  Network: use --host to expose
```

---

## 3. Branching Strategy (GitHub Flow)

### Overview

We use **GitHub Flow** - a simple, branch-based workflow:

1. `main` branch is always deployable
2. Create feature branches from `main`
3. Work on feature with descriptive commits
4. Open Pull Request for review
5. Merge to `main` after approval
6. Delete feature branch

### Branch Naming Convention

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New features | `feature/system-tray` |
| `fix/` | Bug fixes | `fix/hotkey-conflict` |
| `docs/` | Documentation | `docs/setup-guide` |
| `refactor/` | Code refactoring | `refactor/rust-modules` |
| `test/` | Adding tests | `test/integration` |

### Example Workflow

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/translucent-ui

# 3. Make changes and commit
git add .
git commit -m "feat(ui): implement translucent window effect"

# 4. Push to remote
git push origin feature/translucent-ui

# 5. Create Pull Request on GitHub
# (Use GitHub web interface)

# 6. After merge, clean up
git checkout main
git pull origin main
git branch -d feature/translucent-ui
```

### Current Branches

We have created:
- ✅ `main` - Main development branch
- ✅ `feature/translucent-ui` - Example feature branch

### Commit Message Format

Following [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Maintenance

**Examples:**
```bash
feat(ui): add translucent window effect
fix(hotkey): resolve Windows registration bug
docs(readme): update Docker setup instructions
chore: setup development environment
```

---

## 4. Development Tools

### Required Tools

| Tool | Version | Installation | Purpose |
|------|---------|-------------|---------|
| **Node.js** | v18+ | https://nodejs.org | JavaScript runtime |
| **npm/pnpm** | Latest | `npm i -g pnpm` | Package manager |
| **Rust** | Stable | https://rustup.rs | Backend language |
| **Cargo** | Latest | (included with Rust) | Rust package manager |
| **Docker** | Latest | https://docker.com | Containerization |
| **Git** | 2.0+ | https://git-scm.com | Version control |
| **VS Code** | Latest | https://code.visualstudio.com | IDE (recommended) |

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "rust-lang.rust-analyzer",
    "tauri-apps.tauri-vscode",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-azuretools.vscode-docker"
  ]
}
```

### Development Commands

```bash
# Install dependencies
npm install
# or
pnpm install

# Development mode (native)
npm run tauri:dev

# Development mode (Docker)
docker-compose up

# Build for production
npm run tauri:build

# Code quality
npm run lint              # ESLint
npm run format            # Prettier

# Rust commands
cd src-tauri
cargo build              # Build
cargo test               # Test
cargo clippy             # Lint
cargo fmt                # Format
```

### Environment Setup Verification

```bash
# Check Node.js
node --version
# Expected: v18.0.0 or higher

# Check npm
npm --version
# Expected: 9.0.0 or higher

# Check Rust
rustc --version
# Expected: rustc 1.70.0 or higher

# Check Cargo
cargo --version
# Expected: cargo 1.70.0 or higher

# Check Docker
docker --version
# Expected: Docker version 24.0.0 or higher

# Check Docker Compose
docker-compose --version
# Expected: docker-compose version 2.0.0 or higher
```

---

## 5. Verification & Proof

### ✅ Checklist

- [x] Repository created with proper structure
- [x] `.gitignore` configured for Node/Rust/Tauri
- [x] Branching strategy documented in README
- [x] Feature branch created (`feature/translucent-ui`)
- [x] Docker Desktop installed
- [x] Dockerfile created and tested
- [x] docker-compose.yml configured
- [x] Quick Start section added to README
- [x] Development tools documented
- [x] MoSCoW prioritization created

### Screenshots Required

**Take the following screenshots for submission:**

1. **GitHub Repository**
   - Repository home page showing folder structure
   - Branches page showing `main` and `feature/*` branches
   - README.md displaying branching strategy section

2. **Docker**
   - Terminal showing `docker build -t tars-dev .` success
   - Terminal showing `docker-compose up` running
   - Docker Desktop showing running containers

3. **Local Development**
   - Terminal showing successful `npm run tauri:dev`
   - Application window running (if GUI available)
   - VS Code with project open showing file structure

4. **Git**
   - Terminal showing `git branch` output
   - Terminal showing `git log --oneline --graph`
   - GitHub network graph showing branches

### Docker Build Verification

```bash
# 1. Build the image
docker build -t tars-dev .
# ✅ Should complete without errors

# 2. Check image exists
docker images | grep tars-dev
# ✅ Should show tars-dev image

# 3. Run container
docker-compose up
# ✅ Should start dev server on port 1420

# 4. Check logs
docker-compose logs tars-dev
# ✅ Should show "VITE ready" message
```

### Git Branch Verification

```bash
# Show all branches
git branch -a
# Output:
#   * main
#     feature/translucent-ui
#     remotes/origin/main
#     remotes/origin/feature/translucent-ui

# Show branch graph
git log --oneline --graph --all
# Output should show branching structure
```

### Access URLs

After successful Docker setup:

- **Vite Dev Server:** http://localhost:1420
- **Documentation:** http://localhost:8080 (if docs service enabled)

---

## 🎯 Quick Verification Commands

Run these commands to verify everything is set up correctly:

```bash
# 1. Clone and navigate
git clone https://github.com/Arnav717/tars.git
cd tars

# 2. Check structure
ls -la
# Should show: src/, src-tauri/, docs/, Dockerfile, docker-compose.yml, etc.

# 3. Verify Git configuration
git remote -v
git branch -a

# 4. Build with Docker
docker-compose up --build

# 5. In another terminal, check container
docker ps
# Should show tars-dev container running

# 6. View logs
docker-compose logs -f tars-dev
```

---

## 📝 Notes

- **Desktop App Limitation:** TARS is a desktop application, so it won't run in a browser like a web app. The Docker setup is primarily for development environment consistency and building.

- **Display Issues:** Running GUI apps in Docker requires X11 forwarding or VNC setup, which is complex. For actual testing, use native development (`npm run tauri:dev`).

- **CI/CD Ready:** The Docker setup is perfect for automated builds in GitHub Actions or other CI/CD platforms.

---

## 🚀 Next Steps

1. ✅ Complete this dev setup
2. 📸 Take required screenshots
3. 🔧 Start implementing user stories from MoSCoW prioritization
4. 🧪 Set up automated testing
5. 🚢 Configure CI/CD pipeline

---

*Last Updated: 6 February 2026*
*Author: Arnav Kamra*
