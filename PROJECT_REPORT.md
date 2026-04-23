# Omni Mart - Project Report

## Executive Summary
Omni Mart is a modern, premium B2B wholesale marketplace designed to connect global sellers with buyers seamlessly. The platform features robust role-based access control, dynamic tiered bulk pricing, and a stunning glassmorphism-inspired UI designed to maximize user engagement and trust.

## Technology Stack
- **Frontend Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with specific custom utility extensions) and Framer Motion for dynamic micro-animations
- **Backend & Database**: Supabase (PostgreSQL, Authentication, Storage, Edge Functions)
- **State Management**: React Query (Server State) & React Context API (Client State)
- **Routing**: React Router DOM
- **UI Components**: Shadcn UI (Radix Primitives)

## Core Architecture
The application is built around a Role-Based Access Control (RBAC) architecture separating users into three primary domains:
1. **Buyers**: Browse the marketplace, interact with dynamic carts, apply coupons, save multiple addresses, and track complex orders.
2. **Sellers**: Access a dedicated Seller Dashboard to manage product inventory, upload media (via Supabase Storage), set bulk pricing tiers (MOQ logic), handle order fulfillment, and customize their store profiles.
3. **Administrators**: Possess superadmin privileges via a secure Edge Function-initialized account to verify/reject new sellers, moderate products, and oversee system-wide metrics.

## Key Features
- **Tiered Bulk Pricing Engine**: Automated, volume-based price adjustments integrated directly into the real-time cart.
- **Secure File Storage Infrastructure**: Automated multi-image uploads using Supabase Storage buckets (`product-images`, `seller-assets`) with seamless edge CDN delivery.
- **Premium Design Aesthetics**: Rich visual hierarchy utilizing `lucide-react` iconography, deep gradients, custom scrollbars, blur backdrops, and interactive floating components designed for modern conversion flows.
- **Integrated CI/CD Pipeline**: Automated GitHub Actions workflow (`.github/workflows/ci.yml`) enforcing strict ESLint code quality, TypeScript type validation, and production build testing on the `main` branch.

## Deployment & Security Strategy
- **Frontend Environment**: Configured for rapid deployment to edge networks like Vercel or Netlify via Vite's optimized build bundles.
- **Database Security**: Enforced via Supabase Row Level Security (RLS) policies to ensure cross-tenant data isolation (e.g., Sellers can only edit their own products).
- **Code Quality Assurances**: The repository currently holds a 0-error TypeScript compilation state and a 0-error strict ESLint profile, ensuring maximum production reliability.
