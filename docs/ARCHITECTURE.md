# TARS System Architecture Diagram

## Overview

This architecture diagram represents the **future state** of the TARS (Text-based Autonomous Response System) application, showing the complete system design from user interaction through deployment.

## How to Use This Diagram

### Opening in Draw.io

1. **Online (Recommended):**
   - Go to https://app.diagrams.net/
   - Click "Open Existing Diagram"
   - Select `TARS_Architecture_Diagram.drawio`
   - The diagram will open in landscape orientation

2. **Desktop App:**
   - Download Draw.io Desktop from https://github.com/jgraph/drawio-desktop/releases
   - Open the `.drawio` file
   - View/edit as needed

3. **VS Code:**
   - Install "Draw.io Integration" extension
   - Open the `.drawio` file directly in VS Code

### Exporting

- **PNG:** File → Export as → PNG (recommended for presentations)
- **PDF:** File → Export as → PDF (for documentation)
- **SVG:** File → Export as → SVG (for web/scalable graphics)

## Architecture Layers Explained

### 1. **User Interaction Layer** (Blue)
The entry points for user interaction:
- **Global Hotkey (Ctrl+Space):** Instant app activation
- **Text Selection:** Automatic context capture from clipboard
- **System Tray:** Background access and controls
- **Notifications:** Toast messages for feedback

### 2. **Frontend Layer** (Purple)
Built with Tauri + Web Technologies:
- **UI Components:** Translucent window, chat interface, markdown/code rendering
- **Vite Dev Server:** Hot module reload for rapid development
- **State Management:** Local state for conversations and settings

### 3. **Backend Layer** (Orange)
Rust-powered backend via Tauri:
- **Tauri Core:** IPC bridge between frontend and backend
- **System Integration:** OS-level features (hotkeys, clipboard, window management)
- **Business Logic:** Request processing, prompt templates, usage tracking
- **Security Layer:** API key encryption and secure storage
- **Settings Manager:** Configuration persistence

### 4. **AI Services Layer** (Green)
Flexible AI provider integration:
- **AI Router:** Intelligent selection between providers with fallback
- **OpenAI API:** GPT-4/4o integration with streaming support
- **Claude API:** Anthropic Claude 3.5 integration
- **Local LLM:** Privacy-focused offline mode (Ollama, LLaMA.cpp)

### 5. **Data Persistence Layer** (Yellow)
Local-first data storage:
- **SQLite Database:** Conversation history, preferences, templates, usage stats
- **Cache Layer:** Response caching for offline mode and performance

### 6. **Deployment & Infrastructure** (Pink)
Modern CI/CD and distribution:
- **Docker:** Containerized development and build environment
- **GitHub Actions:** Automated CI/CD pipeline
- **Multi-Platform Build:** Native binaries for Linux, Windows, macOS
- **Distribution:** GitHub Releases with auto-update support
- **Monitoring:** Error tracking and performance metrics
- **Documentation:** User guides and API documentation

## Data Flow

### Primary User Flow
```
User → Hotkey (Ctrl+Space) → Tauri Window Opens → User Types Query
→ Frontend (UI) → IPC → Rust Backend → AI Router 
→ LLM API (OpenAI/Claude/Local) → Response Streaming 
→ Backend → Frontend → Display to User
```

### Text Selection Flow
```
User Selects Text → Presses Ctrl+Space → Clipboard Capture 
→ Text Auto-populated in Input → Same as above
```

### Offline Mode Flow
```
User Query → Backend → Cache Check → Cache Hit?
  ├─ Yes → Return Cached Response
  └─ No → Check Network → Online?
       ├─ Yes → API Call → Cache Result → Return
       └─ No → Return Offline Error
```

## Key Design Decisions

### 1. **Local-First Architecture**
- SQLite for conversation history (no cloud dependency)
- Local caching for offline functionality
- API keys stored securely on device

### 2. **Multi-Provider AI Support**
- Not locked to single LLM provider
- User can switch between OpenAI, Claude, or local models
- Fallback mechanism ensures reliability

### 3. **Native Desktop Performance**
- Tauri provides near-native performance
- Rust backend for speed and safety
- Sub-200ms launch time goal

### 4. **Privacy-Focused**
- Optional local LLM support
- No telemetry by default
- User controls all data

### 5. **Modern DevOps**
- Docker for consistent development
- GitHub Actions for automated testing and deployment
- Multi-platform builds from single codebase

## Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | HTML, CSS, JavaScript, Vite |
| **Backend** | Rust, Tauri Framework |
| **AI Integration** | OpenAI API, Anthropic Claude API, Ollama |
| **Database** | SQLite |
| **Caching** | In-memory + file-based cache |
| **Containerization** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |
| **Build System** | Cargo (Rust), npm/pnpm (JS) |
| **Deployment** | GitHub Releases, Auto-updater |

## Color Coding

- **Blue (#E1F5FF):** User interaction and system integration
- **Purple (#F3E5F5):** Frontend/UI layer
- **Orange (#FFF3E0):** Backend/Rust layer
- **Green (#E8F5E9):** AI services and external APIs
- **Yellow (#FFF8E1):** Data persistence and caching
- **Pink (#FCE4EC):** Deployment and infrastructure

## Legend

- **Solid Arrows (→):** Synchronous calls/requests
- **Dashed Arrows (⇢):** Asynchronous events/responses
- **Thick Arrows:** Primary data flow
- **Thin Arrows:** Secondary/optional flow

## Scalability Considerations

### Current Architecture Supports:
- ✅ Single-user desktop application
- ✅ Multiple AI providers
- ✅ Local data storage
- ✅ Offline functionality

### Future Enhancements (Not in Current Scope):
- 🔄 Cloud sync for conversation history
- 🔄 Team collaboration features
- 🔄 Browser extension integration
- 🔄 Mobile companion app
- 🔄 Plugin/extension system

## Security Features

1. **API Key Management:** Encrypted storage using OS keychain
2. **Local Processing:** Sensitive data never leaves device (local LLM mode)
3. **HTTPS Only:** All external API calls encrypted
4. **No Telemetry:** Privacy-first approach
5. **Sandboxed:** Tauri security model isolates frontend from system

## Performance Targets

| Metric | Target | Layer |
|--------|--------|-------|
| Launch Time | < 200ms | Frontend + Backend |
| Hotkey Response | < 100ms | System Integration |
| API Response Start | < 500ms | AI Services |
| Streaming First Token | < 1s | AI Services |
| Database Query | < 10ms | Data Layer |
| Cache Hit | < 5ms | Data Layer |

## Monitoring & Observability

- **Error Tracking:** Capture and report crashes
- **Performance Metrics:** Track launch time, API latency
- **Usage Analytics:** Count requests, track popular features (opt-in)
- **Health Checks:** Monitor API availability

## Deployment Pipeline

```
Code Push → GitHub → GitHub Actions Trigger
  ↓
Run Tests (Rust + JS)
  ↓
Docker Build
  ↓
Multi-Platform Compilation (Linux, Windows, macOS)
  ↓
Package Binaries (.deb, .exe, .dmg, .AppImage)
  ↓
Create GitHub Release
  ↓
Publish Artifacts
  ↓
Auto-Update Notification to Users
```

## Related Documentation

- [Development Setup Guide](./DEV_SETUP_GUIDE.md)
- [MoSCoW Prioritization](../MOSCOW_PRIORITIZATION.md)
- [README](../README.md)

---

**Version:** 1.0  
**Date:** 6 February 2026  
**Author:** Arnav Kamra  
**Format:** Draw.io XML (Landscape, Single Page)
