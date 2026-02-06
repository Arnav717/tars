# TARS: Your Always-On AI Companion

A minimalist, instantly accessible AI utility built using **Tauri** and **Rust**, designed to live quietly in your operating system until you need it — then appear with a simple hotkey.

---

## 🔮 Vision Document

### 1. Project Name & Overview
**Project Name:** TARS (Text-based Autonomous Response System)
**Overview:** TARS is a native desktop application that bridges the gap between your operating system and powerful AI models. Unlike browser-based tools, TARS is always one keystroke away, providing instant, context-aware assistance without forcing you to switch windows or break your mental flow.

### 2. Problem it Solves
In today's fast-paced digital environment, accessing AI assistance typically involves high-friction steps: opening a browser, ensuring a tab is loaded, navigating to a site, and managing a chat thread. This process creates **cognitive interruption**.

TARS solves this by:
- Eliminating context switching.
- Reducing the time-to-answer from ~15 seconds to <2 seconds.
- Removing the need to manage browser tabs for simple queries.

### 3. Target Users (Personas)
*   **The Deep Worker (Students/Researchers):** Users who read heavy documentation or papers and need quick definitions or summaries without losing their place in the text.
*   **The Developer:** Coders who need quick syntax help or error explanations without leaving their IDE context.
*   **The Casual Browser:** Users who want to "fact check" or explore random curiosities instantly while browsing the web or chatting.

### 4. Vision Statement
To create an AI companion that feels like a natural extension of the operating system—invisible when not needed, but instantly available to augment human intelligence with zero friction.

### 5. Key Features / Goals
*   **Instant Hotkey Activation:** Summon TARS instantly (default: `Ctrl+Space`).
*   **Context Awareness:** Automatically captures selected text to provide relevant answers.
*   **Minimalist Design:** A translucent, non-intrusive UI that blends into the desktop environment.
*   **Privacy & Control:** Runs locally with optional API integrations, giving users control over their data.

### 6. Success Metrics
*   **Latency:** Application launch-to-ready time under 200ms.
*   **User Retention:** Daily active usage frequency (stickiness).
*   **Friction Reduction:** Measurable reduction in browser tab switches for AI queries.

### 7. Assumptions & Constraints
*   **Assumptions:**
    *   Users have a stable internet connection for LLM API calls.
    *   Users are comfortable using keyboard shortcuts as a primary interaction method.
*   **Constraints:**
    *   **Platform:** Initially limited to Desktop OS (Linux/Windows/macOS) via Tauri.
    *   **API Usage:** Dependent on third-party API availability and costs (OpenAI/Claude).

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | [Tauri](https://tauri.app/) |
| Backend   | Rust |
| Frontend  | HTML, CSS, JavaScript |
| AI Integration | LLM API (OpenAI/Claude) |

## 📐 SDLC Model

**Chosen Model:** *Agile Software Development Life Cycle (Agile SDLC)*

### Why Agile Works for TARS:
- **Iterative Development:** Evolving feature by feature from a basic chat to a full OS assistant.
- **Continuous Feedback Loop:** Crucial for refining the UX of an "always-on" tool.
- **Flexibility:** Allows quick pivots as AI models and Tauri capabilities evolve.

## 📦 Quick Start – Local Development

### Prerequisites

- **Node.js** (v18 or higher)
- **Rust** (latest stable)
- **Docker Desktop** (for containerized development)

### Option 1: Native Development

```bash
# Clone the repository
git clone https://github.com/Arnav717/tars.git
cd tars

# Install dependencies
npm install
# or
pnpm install

# Run in development mode
npm run tauri:dev
```

### Option 2: Docker Development (Recommended)

```bash
# Clone the repository
git clone https://github.com/Arnav717/tars.git
cd tars

# Build and run with Docker Compose
docker-compose up --build

# Access the application
# The dev server will be available at http://localhost:1420
```

### Docker Commands

```bash
# Build the Docker image
docker build -t tars-dev .

# Run the container
docker run -it --rm \
  -v $(pwd):/app \
  -p 1420:1420 \
  tars-dev

# Stop all containers
docker-compose down

# View logs
docker-compose logs -f tars-dev
```

### Usage

1.  **Launch:** Run the app using one of the methods above
2.  **Summon:** Press `Ctrl+Space` (global hotkey)
3.  **Interact:** Type your query or select text before summoning
4.  **Dismiss:** Press `Esc` to hide the window

---

## 📁 Project Structure

```
tars/
├── src/                      # Frontend source files
│   ├── index.html           # Main HTML entry point
│   ├── main.js              # Frontend JavaScript logic
│   └── style.css            # Application styles
├── src-tauri/               # Rust backend (Tauri)
│   ├── src/
│   │   └── main.rs          # Main entry point (Rust)
│   ├── Cargo.toml           # Rust dependencies
│   └── tauri.conf.json      # Tauri configuration
├── docs/                    # Documentation files
├── tests/                   # Test files
├── .github/                 # GitHub Actions & workflows
│   └── workflows/           # CI/CD pipelines
├── Dockerfile               # Docker container definition
├── docker-compose.yml       # Docker Compose configuration
├── vite.config.js           # Vite bundler config
├── package.json             # Node.js dependencies
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

---

## � Local Development Tools

### Required Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | v18+ | JavaScript runtime for frontend |
| **npm/pnpm** | Latest | Package manager |
| **Rust** | Stable | Backend language for Tauri |
| **Cargo** | Latest | Rust package manager |
| **Docker** | Latest | Containerized development environment |
| **Git** | 2.0+ | Version control |

### Recommended IDE Setup

**VS Code Extensions:**
- `rust-analyzer` - Rust language support
- `Tauri` - Tauri framework support
- `ESLint` - JavaScript linting
- `Prettier` - Code formatting
- `Docker` - Docker support

**Alternative IDEs:**
- IntelliJ IDEA / WebStorm (with Rust plugin)
- Sublime Text (with Rust Enhanced)

### Development Commands

```bash
# Frontend development
npm run dev              # Start Vite dev server
npm run build           # Build frontend for production

# Tauri development
npm run tauri:dev       # Run app in development mode
npm run tauri:build     # Build app for production

# Code quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier

# Rust specific
cd src-tauri
cargo build            # Build Rust backend
cargo test             # Run Rust tests
cargo clippy           # Rust linter
```

---

## 🌿 Branching Strategy (GitHub Flow)

We follow **GitHub Flow** - a lightweight, branch-based workflow perfect for continuous deployment.

### Main Branches

- **`main`** - Production-ready code. Always deployable and stable.

### Feature Branch Workflow

1. **Create a feature branch** from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/hotkey-customization
   ```

2. **Work on your feature** with descriptive commits:
   ```bash
   git add .
   git commit -m "feat: add customizable hotkey configuration UI"
   ```

3. **Push to remote** and create Pull Request:
   ```bash
   git push origin feature/hotkey-customization
   ```

4. **Code Review** - Team reviews PR, runs CI/CD checks

5. **Merge to main** - After approval, merge via GitHub PR interface

6. **Deploy** - `main` branch is automatically deployed (if CI/CD configured)

7. **Delete feature branch** - Keep repo clean
   ```bash
   git branch -d feature/hotkey-customization
   git push origin --delete feature/hotkey-customization
   ```

### Branch Naming Convention

- `feature/description` - New features (e.g., `feature/system-tray`)
- `fix/description` - Bug fixes (e.g., `fix/hotkey-conflict`)
- `docs/description` - Documentation (e.g., `docs/api-setup-guide`)
- `refactor/description` - Code refactoring (e.g., `refactor/rust-modules`)
- `test/description` - Adding tests (e.g., `test/integration-tests`)

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style/formatting
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat(ui): add translucent window effect"
git commit -m "fix(hotkey): resolve Ctrl+Space registration on Windows"
git commit -m "docs(readme): update installation instructions"
```

### Pull Request Guidelines

1. **Title:** Clear and descriptive (follows commit convention)
2. **Description:** Explain what, why, and how
3. **Link Issues:** Reference related issues (e.g., "Closes #15")
4. **Screenshots:** Include for UI changes
5. **Testing:** Describe how you tested the changes
6. **Reviewers:** Tag at least one team member

### Example Feature Branch Creation

```bash
# Create feature branch for Issue #2 (Translucent UI)
git checkout -b feature/translucent-ui

# Make changes...
git add src/style.css src-tauri/src/main.rs
git commit -m "feat(ui): implement frosted glass translucent window"

# Push and create PR
git push origin feature/translucent-ui
# Then create PR on GitHub
```

---

## �👤 Author

**Arnav Kamra**  
