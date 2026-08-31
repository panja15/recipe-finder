# 🍳 Recipe Finder App

A modern, responsive SvelteKit application for searching recipes, managing favorites, building custom recipes, and planning weekly meals. It integrates reusable Web Components built with Stencil.js ([`@panja.tushar15/recipe-components`](https://www.npmjs.com/package/@panja.tushar15/recipe-components)).

---

## 🔗 Project Links

- 📦 **Published Stencil Component Library (NPM)**: [`@panja.tushar15/recipe-components`](https://www.npmjs.com/package/@panja.tushar15/recipe-components)
- 🐙 **GitHub Repositories**:
  - Sveltekit App: [panja15/recipe-finder](https://github.com/panja15/recipe-finder)
  - Stencil Component Library: [panja15/recipe-finder-stencil](https://github.com/panja15/recipe-finder-stencil)

---

## 💻 Tech Stack

- ⚡ **Svelte 5**
- 🛠️ **SvelteKit**
- 📘 **TypeScript**
- 🎨 **StencilJS**
- 🍲 **TheMealDB API**

---

## ✨ Features

### 🔍 Recipe Discovery
- 🔎 Search recipes dynamically
- 🖼️ Browse high-quality recipe cards
- 📁 Filter recipes by category
- 🌐 Filter recipes by cuisine/area

### 📖 Recipe Details
- 📄 View complete recipe details
- 🥗 View ingredients and measurements
- 👨‍🍳 View step-by-step cooking instructions

### 📝 Recipe Management
- ➕ Create custom recipes
- ✏️ Edit custom recipes
- 🗑️ Delete custom recipes with confirmation dialog
- ✅ Validate recipe input fields

### ❤️ Favorites
- 💖 Add recipes to favorites
- 🤍 Remove recipes from favorites
- 📌 View all favorite recipes in a unified grid

### 📅 Weekly Meal Planner
- ➕ Add recipes to specific days of the week
- 🔄 Change planned meals
- ❌ Remove planned meals

---

## 🧩 StencilJS Component Library

The application consumes a separately published StencilJS Web Component library from NPM.

### 📦 Web Components Include:
- 🔍 `recipe-search`
- 🎴 `recipe-card`
- ❤️ `favorite-button`
- 📅 `meal-day-card`

### ⚡ Communication Architecture:
- ⚙️ **Component properties** (data binding)
- 📢 **Custom events** (event dispatching & handlers)
- 📥 **Slots** (content projection)

---

## 🛠️ Setup Instructions

### 📋 Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (or pnpm / yarn)

### 📥 Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/panja15/recipe-finder.git
   cd recipe-finder-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Validate TypeScript & Svelte files**:
   ```bash
   npm run check
   ```

---

## 🚀 Starting Development Server

To start the local development server with hot module replacement (HMR):

```bash
npm run dev
```

To start the server and automatically open the application in your web browser:

```bash
npm run dev -- --open
```

The application will be accessible at `http://localhost:5173`.

---

## 🧠 Assumptions Made

1. **TheMealDB API Availability**: Recipe lookup, search, categories, and cuisine fetching depend on the public [TheMealDB API](https://www.themealdb.com/api.php).
2. **Web Component Integration**: The app consumes Web Components from [`@panja.tushar15/recipe-components`](https://www.npmjs.com/package/@panja.tushar15/recipe-components) loaded via client-side loader (`defineCustomElements()`). It assumes a browser supporting Custom Elements and Shadow DOM.
3. **Browser LocalStorage**: Data persistence for Favorites, Custom Recipe CRUD, and Weekly Meal Plan assignments relies on the browser's native `localStorage`.
4. **Svelte 5 Runes**: Reactive state is managed using Svelte 5 runes (`$state`, `$derived`, `$props`, `$effect`).

---

## 🏗️ Production Build

To build the production bundle:

```bash
npm run build
```

To preview the built production app locally:

```bash
npm run preview
```
