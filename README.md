# Principle's Portfolio

A modern personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.

## Project Overview

This portfolio showcases academic, research, consultancy, publication, and contact information in a polished single-page experience with animated sections, interactive UI, and responsive layout.

## Tech Stack and Versions

The project is currently configured with the following versions:

- Next.js: 16.2.7
- React: 19.2.4
- React DOM: 19.2.4
- TypeScript: ^5
- Tailwind CSS: ^4
- @tailwindcss/postcss: ^4
- Framer Motion: ^12.40.0
- Lucide React: ^1.17.0
- ESLint: ^9
- ESLint Config Next: 16.2.7
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19

### Runtime Environment

This workspace is currently using:

- Node.js: v26.11.1
- npm: 12.2.0

For compatibility with Next.js 16, a Node.js 20+ environment is recommended. The project can run on newer Node versions as well.

## Prerequisites

Before running the app, make sure you have installed:

- Node.js 20 or later
- npm 10 or later

## Installation

```bash
git clone <repository-url>
cd Principle-s-Portfolio
npm install
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Script descriptions

- `npm run dev` - starts the Next.js development server
- `npm run build` - creates a production build
- `npm run start` - runs the production build locally
- `npm run lint` - runs ESLint checks across the project

## Local Development

Start the site locally:

```bash
npm run dev
```

Then open:

- http://localhost:3000

## Project Structure

```text
src/
  app/
  components/
  lib/
public/
```

Key folders include:

- `src/app` - app routing and global styling
- `src/components` - reusable UI and section components
- `src/lib` - utilities, data, and content helpers
- `public` - static assets

## Deployment

This project is suitable for deployment on platforms such as:

- Vercel
- Netlify
- Any Node.js-compatible hosting platform

For deployment in a production environment, use:

```bash
npm run build
npm run start
```

## Notes

This README was updated to match the actual versions installed in the workspace and the current project configuration.
