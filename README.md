# 🛰️ VisionLab

**VisionLab** is a high-performance image processing application that brings low-level C++ performance to the browser using **WebAssembly (Wasm)**. Combined with a modern React frontend and a scalable Node.js/Express backend, VisionLab delivers near-instantaneous visual transformations and secure cloud image management.

---

## 🌟 Key Features

### ⚡ WebAssembly (C++) Processing Engine
* **Blur & Smoothing**:
  * **Mean Blur**: Spatial box filtering with configurable kernel size.
  * **Gaussian Blur**: Multi-pass separable Gaussian kernel smoothing.
* **Tone & Color Adjustments**:
  * **Exposure Control**: Dynamic brightness adjustment.
  * **Contrast Adjustment**: Midtone-anchored contrast scaling.
  * **Saturation Control**: Luminance-weighted color intensity modification.
  * **Histogram Equalization**: Adaptive luminance redistribution using Cumulative Distribution Function (CDF).
* **Sharpening & Edge Detection**:
  * **Laplacian Filter**: 3x3 second-derivative spatial edge detection.
  * **Sharpening Filter**: High-pass spatial contrast enhancement.
  * **Canny Edge Detection**: Multi-stage edge detection pipeline (Gaussian filtering, Sobel gradients, Non-Maximum Suppression, and Hysteresis Thresholding).
* **Noise Generation & Effects**:
  * **Gaussian Noise**: Normal distribution random noise injection.
  * **Salt & Pepper Noise**: Impulse noise simulation with configurable probability.
* **Geometric Transformations**:
  * **Horizontal & Vertical Flip**: Spatial pixel reflection.
  * **Custom Region Crop**: Coordinate-bounded cropping with zero-padding safety.

---

### 🎨 Modern Frontend Experience
* **React 19 & Vite**: Fast development with HMR and modern JSX rendering.
* **Interactive Control Panel**: Intuitive sliders and real-time processing controls.
* **Authentication**: Integrated support for **Firebase Auth** and **Auth0**.
* **Modern UI & Icons**: Built using CSS Modules and **Lucide React** icons.

---

### ☁️ Cloud Backend & Storage
* **RESTful API**: Built with **Node.js** and **Express.js**.
* **Cloud Storage**: Seamless image uploads to **Cloudinary** using **Multer** memory streaming.
* **Database**: Persistent metadata storage using **MongoDB** & **Mongoose**.
* **Security & Auth**: Verified authentication with **Firebase Admin SDK**.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Core Engine** | C++17 / Emscripten | Low-level processing compiled to WebAssembly (Wasm) |
| **Libraries** | STB (`stb_image`, `stb_image_write`) | Lightweight image loading and export |
| **Frontend** | React 19, Vite, Lucide React, React Router 7 | Responsive SPA user interface |
| **Styling** | CSS Modules | Encapsulated, component-scoped styling |
| **Backend** | Node.js, Express 5 | REST API web service |
| **Database** | MongoDB, Mongoose 9 | Cloud database for user image records |
| **Cloud Storage** | Cloudinary | Asset delivery network & storage |
| **Auth** | Firebase Auth / Auth0 / Firebase Admin SDK | Secure user authentication |

---

## 📁 Repository Structure

```
vision_lab/
├── backend/                  # Node.js & Express REST API Server
│   ├── config/               # Database, Cloudinary & Firebase configurations
│   ├── controllers/          # Business logic for auth & image endpoints
│   ├── models/               # Mongoose schema definitions
│   ├── routes/               # Express API routes
│   └── server.js             # API entry point
├── frontend/                 # React 19 + Vite Web Application
│   ├── src/
│   │   ├── App/              # Core components (Workspace, Controls, Header)
│   │   ├── Authenticate/     # Auth views
│   │   └── Profile/          # User profile view
│   └── package.json
├── modules_cpp/              # C++ Engine Source Code
│   ├── module.cpp            # Filter implementations & Emscripten bindings
│   ├── stb_image.h           # STB Image Decoder
│   └── stb_image_write.h     # STB Image Encoder
└── modules_js/               # WebAssembly Build Artifacts
    ├── module.js             # Emscripten JS glue code
    └── module.wasm           # Compiled WebAssembly binary
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* *(Optional)* **Emscripten SDK (emcc)** if modifying and compiling C++ modules.

---

### 1️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables (.env file in backend/ directory)
# MONGO_URI=<your_mongodb_connection_string>
# CLOUDINARY_CLOUD_NAME=<your_cloud_name>
# CLOUDINARY_API_KEY=<your_api_key>
# CLOUDINARY_API_SECRET=<your_api_secret>
# PORT=3000

# Start backend server
npm start
```
The backend API server will run on `http://localhost:3000`.

---

## ⚙️ Building the WebAssembly Engine

To recompile the C++ processing module into WebAssembly:

```bash
emcc modules_cpp/module.cpp -o modules_js/module.js \
  -O3 \
  -flto \
  -msimd128 \
  -s WASM=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s FORCE_FILESYSTEM=1 \
  -s MODULARIZE=1 \
  -s EXPORT_NAME="createModule" \
  -s "EXPORTED_RUNTIME_METHODS=['FS']" \
  --bind \
  -I.
```

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signin` | Authenticate or create user session |
| `POST` | `/api/image/:userid` | Upload image to Cloudinary & store DB record |
| `GET` | `/api/image/:userid` | Fetch user's uploaded images |
| `DELETE` | `/api/image` | Delete specific image from Cloudinary & DB |
| `DELETE` | `/api/images/:uid` | Bulk delete all images for a user |

---

## 📄 License

Distributed under the ISC License. See `LICENSE` for more details.