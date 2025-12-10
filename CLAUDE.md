# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Common Development Tasks

- `pnpm dev` - Start development server for all apps
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run linter on all workspaces
- `pnpm clean` - Clean git-ignored files from node_modules
- `pnpm clean:workspaces` - Clean all workspace build artifacts

### Web App Specific Commands

- `pnpm web:dev` - Start web app development server only (uses Turbopack with HTTPS)
- `pnpm web:build` - Build web app only
- `pnpm web:start` - Start web app production server
- `pnpm web:icons` - Generate icons for web app

### Backend Commands

- `cd apps/base && pnpm dev` - Start PocketBase backend server
- `cd apps/base && pnpm typegen` - Generate PocketBase TypeScript types

### UI Package Commands

- `pnpm ui:build` - Build UI package only
- `pnpm build:icons` - Build icons for UI package
- `cd packages/ui && pnpm generate:component` - Generate new React component using Turbo

## Architecture Overview

### Monorepo Structure

This is a Turborepo monorepo with pnpm workspaces:

- `apps/web-app` - Next.js web application (main app)
- `apps/base` - Go backend with PocketBase
- `packages/ui` - Shared UI components
- `packages/typescript-config` - Shared TypeScript configurations
- `packages/jobs` - Background job utilities
- `packages/logger` - Logging utilities

### Web App Architecture

The web app (`apps/web-app`) is a Next.js application with:

#### Key Technologies

- **Next.js 15** with App Router and internationalization
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **PocketBase** as backend/database
- **Zustand** for state management
- **Biome** for linting and formatting

Note: 3D pet system uses GIF assets in `public/static/`, not Three.js.

#### Clean Architecture Structure

The app follows clean architecture and hexagonal principles:

**Domain Layer:**

- `src/data/domain/models/` - Core business entities (card.ts, deck.ts, user.ts, etc.)
- `src/data/domain/services/` - Business logic services (flashcard-sorting.ts, update-stats.ts)

**Infrastructure Layer:**

- `src/data/infrastructure/pocketbase/` - PocketBase database adapters
- `src/data/infrastructure/state/` - Zustand state management stores
- `src/data/base.ts` - Unified adapter following mega-adapter pattern

**Application Layer:**

- `src/data/ports/` - Repository interfaces/contracts
- `src/data/use-*.ts` - React hooks for data access and mutations
- `src/data/adapters/` - External service adapters

**Presentation Layer:**

- `src/components/features/` - Feature-specific React components
- `src/components/ui/` - Reusable UI components
- `src/app/` - Next.js App Router pages and layouts

#### Key Features

- **Flashcard System**: Leitner box spaced repetition system
- **Authentication**: PocketBase-based auth
- **Internationalization**: Multi-language support
- **Pet System**: Interactive virtual pets using GIF animations
- **Dashboard**: Modular dashboard with various widgets

#### Routing Structure

- `app/[locale]/(authenticated)/` - Protected routes requiring auth
- `app/[locale]/(public)/` - Public routes including auth pages
- Uses Next.js App Router with layout nesting

### Code Style and Conventions

- **Biome** configuration enforces:
  - 2-space indentation with tabs
  - Single quotes for strings (including JSX)
  - Trailing commas
  - 120 character line width
  - Arrow parentheses as needed
  - Automatic import organization
  - Sorted CSS classes with clsx, cva, tv functions
- **Path aliases**: `_/` points to `src/`
- **Component structure**: Feature-based organization
- **Styling**: Tailwind CSS v4 with custom design system

#### Type Safety Requirements

**STRICTLY FORBIDDEN:**

- Using `any` type anywhere in the codebase
- Type assertions (`as Type`) without proper justification
- Ignoring TypeScript errors or using `@ts-ignore`
- Returning raw infrastructure types from data layer functions

**REQUIRED:**

- All functions must have explicit return types
- All async operations must use Result<T> pattern for error handling
- Domain models must be used for all business logic interactions
- Infrastructure types must be mapped to domain models at adapter boundaries

**When working with existing code that has `any` types:**

1. Identify the proper domain model type that should be used
2. Create type-safe mapper functions if needed
3. Update the function signature to use the correct type
4. Ensure all callers are compatible with the new type

### Data Layer Architecture

The data layer strictly follows the **Ports and Adapters (Hexagonal) Pattern** to ensure clean separation of concerns and maintainability.

#### CRITICAL: Ports and Adapters Pattern Requirements

**ALWAYS follow these rules when working with data layer code:**

1. **Domain Models First**: All data interactions MUST use domain models from `src/data/domain/models/`
   - Domain models define the core business entities
   - Infrastructure types (like PocketBase responses) should NEVER leak into domain logic
   - Use proper TypeScript interfaces, NO `any` types allowed

2. **Repository Contracts**: All data access MUST go through port interfaces in `src/data/ports/`
   - Port interfaces define the contracts that adapters must implement
   - Return types MUST be domain models wrapped in Result<T> pattern
   - Never expose infrastructure-specific types in port interfaces

3. **Adapter Implementation**: Infrastructure adapters in `src/data/infrastructure/pocketbase/`
   - MUST implement the port interfaces exactly
   - MUST convert infrastructure types to domain models using mapper functions
   - NO type assertions (`as Type`) - use proper type-safe mapping
   - Handle all possible error cases with Result<T> pattern

4. **Type-Safe Mapping**: When converting between infrastructure and domain types:

   ```typescript
   // ✅ CORRECT: Type-safe mapper function
   const mapFlashcardResponse = (response: FlashcardsCardsResponse): Flashcard => ({
     id: response.id,
     question: response.question,
     answer_type: response.answer_type as AnswerType, // Only when enum conversion needed
     // ... other fields
   });

   // ❌ WRONG: Direct type assertion
   const card = response as Flashcard;

   // ❌ WRONG: Using any
   const card: any = response;
   ```

5. **Result Pattern**: All async operations MUST use Result<T> for error handling
   - Successful operations: `Result<T>` where T is a domain model
   - Failed operations: Include proper error information
   - NO throwing raw errors in adapters - use tryCatch utility

6. **Unified Adapter Pattern**: Use `base.ts` to access all repositories
   - Single BasePort interface extends all repository interfaces
   - Mega-adapter pattern: `import { base } from '_/data/base'`
   - Implementation in `pocketbase.ts` exports unified adapter
   - Maintains dependency inversion principle

**Port-Adapter Structure:**

- `src/data/ports/` - Repository interfaces defining contracts (e.g., `CardRepository`)
- `src/data/infrastructure/pocketbase/` - PocketBase implementations of port interfaces
- `src/data/base.ts` - Unified adapter exposing all repository methods

**Domain Models:**

- `src/data/domain/models/` - Core business entities with proper TypeScript types
- `src/data/domain/services/` - Domain services for complex business operations

**State Management:**

- `src/data/infrastructure/state/` - Zustand stores for client-side state
- `src/data/use-*.ts` - Custom React hooks that use repository interfaces
- Result type pattern for consistent error handling throughout the data layer

### State Management

**Client State (Zustand):**

- `store-flashcards.ts` - Flashcard and deck state
- `store-session.ts` - Study session state
- `store-colors.ts` - Color management state
- `store-user.ts` - User preferences and profile
- `store-bound.ts` - Bound store utilities
- `create-selectors.ts` - Selector utilities for state access

**Server State:**

- Custom React hooks (`use-*.ts`) for server state management
- PocketBase real-time subscriptions
- Next.js server components for initial data fetching

**Local Component State:**

- React useState and useReducer for component-specific state
- Form state management with controlled components

## Testing and Quality

### Linting and Formatting

- Run `pnpm lint` to check all workspaces
- Biome handles both linting and formatting
- Automatic import organization enabled

### Type Checking

- TypeScript 5.5.4 with strict configuration
- Run `pnpm typecheck` for type checking (defined in turbo.json)
- Shared config in `packages/typescript-config`
- No test framework currently configured

## Important Notes

- The flashcard system uses the Leitner box algorithm for spaced repetition
- 3D pet animations are stored in `/public/static/` directory with GIF files for different pet types
- The app supports multiple locales with Next.js internationalization using `next-international`
- PocketBase types are generated in `pocketbase-types.ts` using the `typegen` command
- Icon generation scripts are available for both web app and UI package
- Web app runs with experimental HTTPS in development mode
- Turborepo handles build orchestration with proper task dependencies


## Docs

Save work to .idea/ in existing folders: plans/, current-work/, improvements/, refs/, analysis/
When the document doesn't fit any existing category, create a folder named after content type (e.g., reviews/)

## General Rules

- Don't make assumptions, always check against the codebase
- Don't sign commit messages
- Always check if the fix is hiding the actual issue
- Don't run the linter, prefer running biome only on changed files

**Remember:** When in doubt, check the codebase or the external docs. Never assume.
