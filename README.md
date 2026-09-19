# Auth React

A small React + TypeScript auth application built with Vite, Redux Toolkit, RTK Query, React Router, styled-components, and i18n support.

## Overview

This app includes:

- Sign-in and sign-up flows
- Protected dashboard route
- JWT-aware API requests
- User profile loading after authentication
- Version page using an API query
- Route guards for authenticated and guest-only pages
- Localization via `react-i18next`

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit + React Redux
- RTK Query
- React Router DOM
- styled-components
- ESLint + Prettier

## Getting Started

Install dependencies:

```bash
yarn install
```

Start the dev server:

```bash
yarn dev
```

Build for production:

```bash
yarn build
```

Run linting:

```bash
yarn lint
```

Format files:

```bash
yarn format
```

## Project Structure

```text
├── public/                          # Static assets served directly
├── src/
│   ├── app.tsx                     # Root app with router + Redux provider
│   ├── index.tsx                   # Application entry point
│   ├── components/
│   │   ├── page-layout/
│   │   │   └── page-layout.tsx     # Shared page wrapper that updates document title
│   │   └── ui-components/
│   │       ├── button/
│   │       │   └── button.tsx      # Styled action button
│   │       ├── flex/
│   │       │   └── flex.tsx        # Layout helper component
│   │       └── input/
│   │           └── input.tsx       # Styled text input
│   ├── features/
│   │   ├── auth/
│   │   │   ├── sign-in-page.tsx    # Login page UI and actions
│   │   │   └── sign-up-page.tsx    # Registration page UI and actions
│   │   ├── dashboard/
│   │   │   └── dashboard-page.tsx  # Authenticated dashboard page
│   │   └── version/
│   │       └── version-page.tsx    # Version display page
│   ├── lib/
│   │   └── i18n.ts                 # Internationalization setup
│   ├── locales/
│   │   └── en.json                 # English translations
│   └── store/
│       ├── auth-api.ts             # Login/register/logout API hooks
│       ├── auth-slice.ts           # Authentication state reducer
│       ├── base-query.ts           # Auth-aware base query with 401 cleanup
│       ├── store.ts                # Redux store configuration
│       ├── user-api.ts             # Current-user API hook
│       ├── user-slice.ts           # User profile reducer
│       └── version-api.ts          # Version API hook
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript project references
├── tsconfig.app.json               # App TS config
├── tsconfig.node.json              # Node/Vite TS config
├── vite.config.ts                  # Vite config
├── README.md                       # Project documentation
├── .gitignore                      # Git ignore rules
├── .prettierignore                 # Prettier ignore rules
├── .prettierrc                     # Prettier settings
├── yarn.lock                       # Yarn lockfile
└── public/                         # Static files
```

## Routes

- `/` — Sign-in page, guest-only
- `/sign-up` — Sign-up page, guest-only
- `/dashboard` — Protected dashboard page
- `/version` — Public version information page

## Notes

- Authentication state is persisted in localStorage via the auth slice.
- RTK Query requests automatically clear auth state on a 401 response.
- The app follows a feature-based structure with reusable UI primitives.
