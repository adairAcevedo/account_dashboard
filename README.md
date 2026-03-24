# 📊 Movement Visualization System (Admin & Client)

**Live Demo:** https://adairacevedo.github.io/account_dashboard/#/login

Single Page Application (SPA) built with **Vue 3 + Vite** for managing
and visualizing financial movements with **role-based access control**.

------------------------------------------------------------------------

## 🚀 Tech Stack

-   **Framework:** Vue 3 (Composition API)
-   **State Management:** Pinia + Reactive Singleton (persisted with
    `localStorage`)
-   **Routing:** Vue Router 4
-   **Build Tool:** Vite
-   **Package Manager:** pnpm
-   **Authentication:** JWT (JSON Web Tokens)

------------------------------------------------------------------------

## 🧩 Features

### 👨‍💼 Admin

-   **User Management**\
    View and manage all registered users.

-   **Advanced Sorting**\
    Multi-column sorting directly from table headers.

-   **Scalable Pagination**\
    Handles datasets with **2000+ pages** using dynamic ellipsis (`...`)
    to keep UI clean.

-   **Drill-down Navigation**\
    Access detailed transaction history per user while preserving state
    after refresh.

------------------------------------------------------------------------

### 👤 Client

-   **Personal Dashboard**\
    View only their own financial movements.

-   **Interactive Data Tables**\
    Sorting and pagination fully supported.

------------------------------------------------------------------------

### 🔐 Security & State Management

-   **Route Protection**\
    Implemented navigation guards (`beforeEach`, `onBeforeRouteLeave`)
    to:
    -   Prevent unauthorized access
    -   Clean sensitive state on navigation
-   **Persistent State**\
    Automatic sync with `localStorage` to maintain session and UI state
    after reload (F5)

------------------------------------------------------------------------

## 📋 Prerequisites

-   Node.js `v24.13.1`
-   pnpm

------------------------------------------------------------------------

## ⚙️ Setup

### 1. Install dependencies

``` bash
pnpm install
```

### 2. Configure environment variables

Create a `.env` file in the root directory:

``` env
VITE_API_BASE_URL=https://your-api.com/api
```

### 3. Run development server

``` bash
pnpm dev
```

client path login
```
/login
```
admin path login
```
/login-admin
```
------------------------------------------------------------------------

## 🏗️ Project Structure

    src/
    │
    ├── components/   # Reusable UI components (Pagination, Tables, Modals)
    ├── views/        # Main views (Login, Admin Dashboard, Movements)
    ├── stores/       # Global state management (Pinia)
    ├── router/       # Routes and navigation guards

------------------------------------------------------------------------

## 🧠 Implementation Highlights

-   **Optimized Pagination**\
    Avoids rendering thousands of buttons by dynamically showing only
    relevant pages.

-   **State Cleanup Strategy**\
    Uses `onBeforeRouteLeave` to clear `selectedUser`, preventing data
    leakage between admin views.

-   **JWT Handling**

    -   Tokens stored securely\
    -   Automatically injected into API requests via interceptors

------------------------------------------------------------------------

## 📌 Notes for Reviewers

-   Focus on **scalability decisions** (pagination, state persistence)
-   Review **navigation guards** for security handling
-   Observe separation between **admin vs client responsibilities**

