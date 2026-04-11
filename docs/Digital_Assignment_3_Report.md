# Digital Assignment 3 - Final Project Report

**Project Name:** TARS (Text-based Autonomous Response System)
**Student Name:** Arnav Kamra

---

## Part A: Testing and Version Management

### 1. Integration/Regression/Mutation Testing (Screenshots)
*(Please insert screenshot of running `vitest` unit/integration tests and `cargo test` backend tests here)*
* [Placeholder for Vitest Test Output Screenshot]
* [Placeholder for Cargo Test Output Screenshot]

### 2. Version Management and System Building
*(Please insert screenshot of Git branch management and GitHub Actions build or local `npm run tauri:dev` build output)*
* [Placeholder for GitHub Repository Branches/Actions Page Screenshot]
* [Placeholder for Tauri Built Window Screenshot]

### 3. Developed Functionalities (Screenshots)
*(Please insert screenshots of the core TARS functionalities: Context-aware responses, UI model selector, etc.)*
* [Placeholder for TARS Chat Interface Screenshot]
* [Placeholder for Screenshot Context functionality Screenshot]

### 4. Tools/Technologies Used
* **Frontend:** React, TypeScript, TailwindCSS, Vite
* **Backend:** Rust, Tauri v2
* **Testing:** Vitest, testing-library, Cargo test
* **Libraries:** `reqwest`, `serde`, `xcap`, `@tauri-apps/api`
* **DevOps:** Git, npm, Cargo

---

## Part C: Project Report

### 1. Problem Statement
Many power users require immediate help from Large Language Models without needing to switch contexts or manually copy-paste code snippets into a browser window. The friction of opening a browser, finding the chat AI, copying clipboard text, and submitting queries often breaks the user's workflow.

**TARS** aims to resolve this by being an always-on, translucent AI companion that leverages native desktop integration. By utilizing global hotkeys, it provides instantaneous access to an LLM context-aware assistant capable of capturing system clipboard and screen contents, allowing users to query information, debug code, and analyze visual data with zero context-switching friction.

### 2. User Stories
* **As a developer**, I want to press a global hotkey to automatically capture my clipboard code and receive suggestions for bugs almost instantaneously without leaving my IDE.
* **As a researcher**, I want to take a snapshot of a graph on my screen and ask the AI companion to analyze the visual data immediately.
* **As an advanced power user**, I want an unobtrusive translucent widget overlay that I can query and easily copy responses from, while still prioritizing native UX integration and high performance.
* **As a privacy-focused user**, I want my conversation histories stored securely on my local device or seamlessly integrated securely with DynamoDB without telemetry.

### 3. System Architecture and System Design
TARS implements a local-first desktop application architecture using the Tauri framework (v2) which leverages Rust for its high-performance backend and React/Vite for a flexible and dynamic DOM layer. 

**Architectural Layers:**
1. **User Interaction Layer:** Accessible via Global Hotkeys (`Ctrl+Shift+U` and `Ctrl+Shift+Y`). Integrates natively into Linux/Windows shortcut mapping.
2. **Frontend Layer:** A translucent chat interface built with React, styled using Tailwind CSS, and bundled by Vite. Maintains connection strictly over Tauri IPC.
3. **Backend Layer (Rust):** Driven by Tauri Core and native OS libraries (`xcap` for display screenshotting, arboard for clipboard). Handles the business logic of building context-aware prompts dynamically.
4. **AI Services Layer:** Uses the modern Google Gemini API natively routed through `reqwest` for both text-to-text generation and multimodal image context understanding.
5. **Persistence Layer:** Integrated with DynamoDB to selectively persist successful resolution histories and context mapping.

### 4. Design of Tests
The project relies on a dual-layered testing strategy to guarantee robustness across the IPC barrier boundary:
1. **Frontend Integration Tests (Vitest & JSDOM):** Validates deterministic logic on the frontend, like ensuring state updates to clipboard contexts are managed efficiently (`src/utils/*.test.ts`). Validates core application React components, mimicking user storage mechanisms.
2. **Backend Regression and Unit Tests (Cargo Test):** Provides memory-safe guarantees on structured formatting tools. Contains unit tests validating strict JSON serialization and deserialization formatting of `MessagePart` and `ConversationData` payloads to assure stability across updates to the Gemini model APIs.

---

## Appendix

### Appendix A: Code Listing Link
[TARS GitHub Repository](https://github.com/Arnav717/tars)

### Appendix B: Class Diagrams / ERD / DFD / UML
*(*Note: Insert exported design materials here or point to `TARS_Architecture_Diagram.drawio` included under `/docs`.*)*
* [Placeholder for TARS Architecture Draw.io Diagram]
