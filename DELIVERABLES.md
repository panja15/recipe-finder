# 📋 Project Deliverables

This document summarizes all project deliverables for the **Recipe Finder Application** and the **StencilJS Web Component Library**.

---

## 📌 Deliverables Summary

### 1. 🌐 Source Code for SvelteKit Application
- **GitHub Repository**: [panja15/recipe-finder](https://github.com/panja15/recipe-finder)
- **Framework**: SvelteKit (Svelte 5 with Runes) + TypeScript

### 2. 🧩 Source Code for StencilJS Component Library
- **GitHub Repository**: [panja15/recipe-finder-stencil](https://github.com/panja15/recipe-finder-stencil)
- **Framework**: Stencil.js Web Components

### 3. 📦 NPM Package Link for Published Component Library
- **NPM Package**: [`@panja.tushar15/recipe-components`](https://www.npmjs.com/package/@panja.tushar15/recipe-components)
- **Latest Version**: `v0.2.1`

### 4. 🚀 Deployed Application URL
- **Live Demo**: [https://recipe-finder-bice-two.vercel.app](https://recipe-finder-bice-two.vercel.app)

---

## 📖 Documentation

### 📋 Setup Instructions

#### Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** (v9.0 or higher)

#### Step-by-Step Installation
1. **Clone the SvelteKit Application Repository**:
   ```bash
   git clone https://github.com/panja15/recipe-finder.git
   cd recipe-finder
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Verify Type-Checking & Syntax**:
   ```bash
   npm run check
   ```

---

### 🚀 Starting Development Server

To launch the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

To launch the development server and automatically open the application in your default browser:

```bash
npm run dev -- --open
```

The application will run locally at: `http://localhost:5173`.

---

### 🧠 Assumptions Made

1. **API Dependency (TheMealDB)**:
   - The application relies on the public [TheMealDB API](https://www.themealdb.com/api.php) for fetching recipe search results, detailed recipe instructions, categories, cuisines, and images.

2. **Web Component Integration**:
   - The SvelteKit application consumes Web Components from [`@panja.tushar15/recipe-components`](https://www.npmjs.com/package/@panja.tushar15/recipe-components).
   - Component initialization uses client-side dynamic loading (`browser` check) to ensure seamless compatibility with Server-Side Rendering (SSR) environments like Vercel.

3. **Data Persistence**:
   - Client-side persistence for Favorite recipes, Custom Recipe CRUD operations, and Weekly Meal Planner uses the browser's native `localStorage`.

4. **Modern Browser Support**:
   - Assumes a modern browser environment supporting Web Components (Custom Elements v1, Shadow DOM) and ES modules.

5. **Svelte 5 & Runes**:
   - Application state and reactivity leverage Svelte 5 runes (`$state`, `$derived`, `$props`, `$effect`).

---

## 🔗 Quick Link Reference

| Resource | Link |
| :--- | :--- |
| **SvelteKit App Repository** | [GitHub Repo](https://github.com/panja15/recipe-finder) |
| **Stencil Component Library Repository** | [GitHub Repo](https://github.com/panja15/recipe-finder-stencil) |
| **Published NPM Package** | [NPM Package](https://www.npmjs.com/package/@panja.tushar15/recipe-components) |
| **Live Deployed Application** | [Vercel Live Demo](https://www.npmjs.com/package/@panja.tushar15/recipe-components) |
