# 🛰️ VisionLab

VisionLab is a modern image processing application that brings low-level C++ performance to the web using WebAssembly. It delivers a fast and responsive environment for advanced visual transformations directly in the browser.

---

## 🚀 Current Status

**Phase 1: Frontend + WebAssembly Engine**

- UI is fully functional
- Core C++ processing module is integrated via WebAssembly
- Backend (Node.js, Express, MongoDB) is under development

---

## ✨ Features

### ⚡ Wasm-Powered Filters
High-performance image processing using C++ compiled to WebAssembly.

### 🧠 Core Processing Suite
- **Mean Blur** – Basic smoothing
- **Gaussian Blur** – Advanced noise reduction
- **Exposure Control** – Adjust brightness dynamically
- **Contrast Adjustment** – Enhance image depth
- **Saturation Control** – Modify color intensity using grayscale weighting

### 🎨 Frontend
- Built with **React 19 + Vite**
- Modular and clean UI
- Fast development with HMR (Hot Module Replacement)

### 🔐 Authentication
- Integrated with **Firebase** and **Auth0** (initial setup)

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Lucide React

### Processing Engine
- C++
- Emscripten (WebAssembly)
- STB Image Libraries

### Styling
- CSS Modules

### Backend (Planned)
- Node.js
- Express
- MongoDB

---

## 📦 Installation & Setup

```bash
git clone https://github.com/Abimanyu-888/vision_lab.git
cd VisionLab
npm install
npm run dev