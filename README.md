# Product Explorer (Next.js App)

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://product-explorer-dashboard-gules.vercel.app/)

A modern, highly responsive e-commerce product explorer built with Next.js 14+, adhering to strict TypeScript standards and modern web best practices.

## 🚀 Key Features

-   **Product Catalog**: Browse products fetched dynamically from a real-world API.
-   **Search & Filter**: Real-time search by title and filtering by categories.
-   **Favorites System**: Add/remove products to your favorites list (persisted locally).
-   **Product Details**: Detailed view for every individual product.
-   **Strict Type Safety**: The entire codebase is enforced with strict TypeScript and runtime validation.

## 🛠️ Technology Stack

This project uses a modern front-end stack focused on performance, type safety, and developer experience.

-   **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) - React framework for production.
-   **Language**: [TypeScript](https://www.typescriptlang.org/) - Statically typed JavaScript.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/) - Accessible components and icons.
-   **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation.
-   **State Management**: React Hooks (`useState`, `useEffect`, `useContext`).
-   **API**: [FakeStoreAPI](https://fakestoreapi.com/) - Mock e-commerce data.

## 🛡️ Strict TypeScript Implementation

We have enforced a Zero-`any` policy in this codebase to ensure maximum reliability.

-   **Centralized Types**: All shared type definitions are located in `lib/types.ts`.
-   **Runtime Validation**: API responses are not just assumed; they are validated against Zod schemas in `lib/schemas.ts` before being used. This prevents runtime crashes due to unexpected API data.
-   **Safe Hooks**: Custom hooks like `useProducts` return strongly typed data patterns.

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js 18.17 or later
-   npm, yarn, or pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── products/[id]/    # Product Details Page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home/Listing Page
├── components/           # Reusable UI components
│   ├── ui/               # Generic UI atoms (buttons, cards, etc.)
│   ├── product-card.tsx  # Product display component
│   └── ...
├── hooks/                # Custom React hooks
│   ├── use-products.ts   # Data fetching with Zod validation
│   └── use-favorites.ts  # Favorites logic
├── lib/                  # Utilities and Definitions
│   ├── schemas.ts        # Zod validation schemas
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## ✅ Commands

-   `npm run dev`: Starts local dev server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts production server.
-   `npm run lint`: Runs ESLint to check for code quality issues.

## 📌 Assumptions

-   **Frontend-Only**: This is a frontend-only assignment; no backend development is involved.
-   **State Management**: Client-side state (localStorage/React State) is considered sufficient for features like "Favorites".
-   **API**: We assume the Public API (FakeStoreAPI) is available and reliable.
