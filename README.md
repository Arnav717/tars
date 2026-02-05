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

## 📦 Installation & Usage

```bash
# Clone the repository
git clone https://github.com/yourusername/tars.git
cd tars

# Install dependencies & Run
npm install
npm run tauri dev
```

1.  **Launch:** Run the app.
2.  **Summon:** Press `Ctrl+Space`.
3.  **Interact:** Type or select text to query.
4.  **Dismiss:** Press `Esc`.

---

## 📁 Project Structure

```
tars/
├── src/              # Frontend source files
├── src-tauri/        # Rust backend (Tauri)
│   ├── src/main.rs   # Main entry point
│   └── Cargo.toml    # Rust dependencies
└── README.md         # This file
```

---

## 👤 Author

**Arnav Kamra**  
