This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Project Highlights
 ## 1-Data Fetching Strategy
Used React Query useInfiniteQuery to implement infinite scrolling for the user list.

The first 10 pages are server-side rendered (SSR) for better SEO and initial load performance.

The remaining pages are fetched via client-side rendering (CSR) using React Query’s infinite loading mechanism.

## 2-Design Patterns & Architecture
Applied the Compound Component design pattern for building the user card component within the user list.

Created custom React hooks (e.g., for fetching users, exporting to Excel, getting window size) to encapsulate logic and promote code reusability.

Implemented API service functions to centralize API calls and improve maintainability.

## 3-State Management
Implemented two state management solutions:

React Context for global shared state.

Zustand for lightweight and efficient local state management.

## 4-Styling & Naming Conventions

Used Tailwind CSS for utility-first, responsive, and clean UI styling.

Applied BEM (Block Element Modifier) methodology for consistent and semantic CSS class naming in specific cases.

Utilized Sass Modules for locally scoped styles where needed.

## 5-UX & Performance Enhancements
Integrated debounced search functionality to optimize API requests during typing.

Added skeleton loading components (shimmer loaders) for both individual components and full app-level loading states using Next.js 15.3 features.

Used Next.js Error Boundaries for clean error handling and fallback UI rendering.

##


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
