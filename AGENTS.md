# csv.repair - AI Agent Guide

## Project Overview

csv.repair is a **client-side CSV repair and analysis tool** built with React, TypeScript, and Tailwind CSS. The application runs entirely in the browser - all CSV parsing, editing, SQL queries, and data visualization happen client-side without uploading files to any server. This ensures complete data privacy for users working with sensitive CSV files.

The tool is designed to handle massive, broken, or malformed CSV files that are too large for Excel or other traditional tools.

## Technology Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript 5.6.3
- **Build Tool**: Vite 7.3.0 (dev server + production builds)
- **Styling**: Tailwind CSS 3.4.17 with custom CSS variables for theming
- **UI Components**: shadcn/ui (50+ Radix UI-based components)
- **State Management**: React hooks + TanStack Query (React Query) v5
- **Routing**: wouter (lightweight React router)
- **Icons**: Lucide React

### Key Libraries
- **PapaParse**: CSV parsing with web worker support for large files
- **AlaSQL**: SQL query execution on in-memory data
- **Recharts**: Data visualization (histograms, pie charts)
- **Framer Motion**: Animations
- **Zod**: Schema validation
- **date-fns**: Date formatting

### Backend (Minimal)
- **Server**: Express.js 5.0.1
- **Language**: TypeScript (tsx for dev, esbuild for production)
- **Storage**: In-memory (MemStorage) - PostgreSQL schema exists but unused
- **Session**: express-session with memorystore

### Database (Schema Only)
- **ORM**: Drizzle ORM 0.39.3
- **Dialect**: PostgreSQL (schema defined in `shared/schema.ts`)
- **Note**: Database is not actively used; the application is client-side only

## Project Structure

```
.
├── client/                     # Frontend React application
│   ├── index.html             # HTML entry point with SEO meta tags
│   └── src/
│       ├── main.tsx           # React app entry
│       ├── App.tsx            # Router and providers
│       ├── index.css          # Tailwind + custom CSS variables
│       ├── components/
│       │   ├── ui/            # shadcn/ui components (50+ files)
│       │   ├── navigation.tsx # Header, nav, footer
│       │   ├── theme-provider.tsx # Dark/light mode context
│       │   └── cookie-banner.tsx
│       ├── pages/
│       │   ├── csv-repair.tsx # Main application page (~2000+ lines)
│       │   ├── about.tsx      # About page
│       │   ├── faq.tsx        # FAQ with accordion
│       │   ├── privacy-policy.tsx
│       │   └── not-found.tsx
│       ├── hooks/
│       │   ├── use-toast.ts   # Toast notifications
│       │   └── use-mobile.tsx # Mobile detection
│       └── lib/
│           ├── utils.ts       # cn() helper for Tailwind
│           └── queryClient.ts # React Query configuration
├── server/                     # Backend Express server
│   ├── index.ts               # Server entry, logging, error handling
│   ├── routes.ts              # API routes (currently empty)
│   ├── storage.ts             # In-memory storage interface
│   ├── vite.ts                # Vite dev server middleware
│   └── static.ts              # Static file serving (production)
├── shared/                     # Shared code between client/server
│   └── schema.ts              # Drizzle ORM schema
├── script/
│   └── build.ts               # Production build script (esbuild + vite)
├── dist/                       # Build output (created by build)
│   └── public/                # Client assets + server bundle
├── package.json
├── vite.config.ts             # Vite configuration with path aliases
├── tailwind.config.ts         # Tailwind with custom theme
├── drizzle.config.ts          # Database migration config
├── tsconfig.json              # TypeScript paths: @/*, @shared/*
└── vercel.json                # Vercel deployment config
```

## Build Commands

```bash
# Development - runs Express + Vite dev server on port 5000
npm run dev

# Production build - builds client (Vite) + server (esbuild)
npm run build

# Production start - runs bundled server from dist/
npm start

# Type check only
npm run check

# Database push (schema to PostgreSQL)
npm run db:push
```

## Development Conventions

### Code Style
- **TypeScript**: Strict mode enabled. All components typed.
- **Imports**: Use path aliases - `@/` for client, `@shared/` for shared
- **Components**: Functional components with hooks
- **Styling**: Tailwind utility classes. Use `cn()` helper for conditional classes.
- **CSS Variables**: Theme colors defined in `index.css` using HSL values

### File Naming
- Components: PascalCase (e.g., `csv-repair.tsx`)
- Utilities: camelCase (e.g., `queryClient.ts`)
- Path aliases configured in `tsconfig.json` and `vite.config.ts`

### Theme System
- Two themes: `dark` (default) and `light`
- CSS variables in `index.css` define color palette
- ThemeProvider context manages state, persists to localStorage
- Toggle available in navigation

### Component Patterns
- shadcn/ui components in `client/src/components/ui/`
- Use Radix UI primitives for accessibility
- Tailwind classes for styling
- Compound component pattern (e.g., Card, CardHeader, CardContent)

## Key Application Features

The main application (`csv-repair.tsx`) is a comprehensive CSV editor:

### Data Processing
- **Parse**: PapaParse with web workers for large files
- **Edit**: Inline cell editing (double-click), undo/redo (50 steps)
- **Search**: Find/replace with match highlighting
- **SQL**: Execute SQL queries via AlaSQL on CSV data

### Data Analysis
- **Column Statistics**: Total, unique, empty counts; min/max/avg for numeric
- **Type Detection**: Automatic detection of dates, emails, URLs, phones, currency
- **Charts**: Histogram for numeric columns, pie chart for categorical

### Repair Features
- **Auto-repair**: Trim whitespace, remove empty rows
- **Templates**: Predefined fixes (standardize dates, normalize phones, etc.)
- **Health Check**: Parse error diagnostics
- **Export**: Download repaired CSV

### UI Features
- **Virtualized Table**: Handles millions of rows
- **Context Menu**: Right-click for row/column operations
- **Keyboard Shortcuts**: Ctrl+Z/Y (undo/redo), Ctrl+F (search), Ctrl+S (export), ? (help)
- **Responsive**: Mobile hamburger menu, adaptive layout

## Testing Strategy

Currently, **no automated tests** are configured. The project relies on:
- TypeScript strict mode for type safety
- Manual testing during development
- React Query's built-in error handling

If adding tests, consider:
- Vitest for unit testing
- Playwright for E2E testing (file upload scenarios)
- Testing Library React for component tests

## Deployment

### Vercel (Configured)
- Build command: `npm run build`
- Output directory: `dist/public`
- SPA routing: All routes fallback to `index.html`

### Environment Variables
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: `development` or `production`
- `DATABASE_URL`: PostgreSQL connection (schema exists but unused)

### Production Build Process
1. `script/build.ts` runs:
   - Cleans `dist/` directory
   - Builds client with Vite → `dist/public/`
   - Builds server with esbuild → `dist/index.cjs`
   - Bundles select dependencies (see `allowlist` in build.ts)

## Security Considerations

1. **Data Privacy**: All CSV processing is client-side. No file upload to server.
2. **XSS Protection**: React's built-in escaping; no dangerous innerHTML usage
3. **CSP**: Not explicitly configured (consider adding for production)
4. **Dependencies**: Regularly audit with `npm audit`

## Performance Notes

- **Web Workers**: PapaParse uses workers for non-blocking CSV parsing
- **Virtualization**: Table renders only visible rows
- **Bundle Size**: Vite handles code splitting
- **Cold Start**: Server build bundles deps to reduce syscalls

## Common Tasks

### Adding a New Page
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Add navigation link in `client/src/components/navigation.tsx`

### Adding a shadcn/ui Component
```bash
# Use the shadcn CLI or manually add:
# 1. Copy component to client/src/components/ui/
# 2. Install any required dependencies
# 3. Update components.json if needed
```

### Modifying the Theme
1. Edit CSS variables in `client/src/index.css` (`:root` for light, `.dark` for dark)
2. Update `tailwind.config.ts` if adding new color tokens

## Troubleshooting

- **Port 5000 in use**: Set `PORT` environment variable
- **Build fails**: Ensure `node_modules` installed, check TypeScript with `npm run check`
- **Vite HMR issues**: Restart dev server, check browser console

## External Services

- **Google Analytics**: Tracking ID `G-R39FXG3NW8` (in `index.html`)
- **Fonts**: Google Fonts loaded for typography variety
- **GitHub**: Author link to https://github.com/hsr88
