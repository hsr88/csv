# csv.repair

## Overview
A client-side tool for analyzing, querying, and fixing massive, broken CSV files. Built with React, Tailwind CSS, PapaParse for CSV parsing, AlaSQL for SQL queries, and Recharts for data visualization.

## Architecture
- **Frontend-only**: No backend API needed. All processing happens in the browser.
- **Stack**: React + TypeScript + Tailwind CSS + Vite
- **Libraries**: PapaParse (CSV parsing with web workers), AlaSQL (SQL queries on data), Recharts (charts/visualization)
- **Theme**: Dark/Light mode with CSS variable system. Default dark. Toggle via navigation menu. Preference stored in localStorage.

## Key Features
- File upload & parsing with PapaParse (worker-based for large files)
- Drag & drop file upload support
- Custom virtualized table supporting millions of rows
- Inline cell editing (double-click to edit, Enter to save, Escape to cancel, Tab to move)
- Undo/Redo with full history (up to 50 steps)
- Search & Replace across all cells with match highlighting
- Column sorting (ascending/descending/reset)
- Column statistics (total, unique, empty, type, min/max/avg for numeric)
- Context menu (right-click) for add/delete rows & columns
- Auto-repair (trim whitespace, remove empty rows)
- Error row highlighting (red background for rows with parse errors)
- Change diff preview before export
- Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+F, Ctrl+S, Ctrl+Shift+R, ?)
- SQL query execution via AlaSQL
- Health check diagnostics showing parse errors
- CSV export of repaired data
- Dark/Light theme toggle
- Responsive navigation with hamburger menu on mobile
- Column Distribution Charts (histogram for numeric, pie chart for categorical) via Recharts
- Automatic data type detection (date, email, URL, phone, currency, number, text)
- Repair Templates (trim whitespace, remove empty/duplicate rows, standardize dates, lowercase emails, normalize phones, fix encoding, clean URLs)

## Pages
- `/` - Main CSV repair tool
- `/about` - About page describing the tool
- `/faq` - Frequently Asked Questions with accordion
- `/privacy` - Privacy Policy (Google Analytics, GitHub contact)

## Sidebar Tabs
- **Data Editor** - Main table view with inline editing
- **SQL Query** - Run SQL queries on CSV data
- **Charts** - Column distribution visualization (histogram/pie chart)
- **Repair Templates** - Predefined one-click repair actions with data type detection
- **Health Check** - File diagnostics and error listing

## Project Structure
- `client/src/pages/csv-repair.tsx` - Main application page (all components)
- `client/src/pages/about.tsx` - About page
- `client/src/pages/faq.tsx` - FAQ page
- `client/src/pages/privacy-policy.tsx` - Privacy Policy page
- `client/src/components/theme-provider.tsx` - ThemeProvider with dark/light toggle
- `client/src/components/navigation.tsx` - Responsive navigation (hamburger on mobile, inline on desktop)
- `client/src/App.tsx` - Router setup with ThemeProvider
- `client/index.html` - HTML entry with dark class and OG meta tags

## Running
- Workflow: `npm run dev` (Express + Vite dev server on port 5000)
