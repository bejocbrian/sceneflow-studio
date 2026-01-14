# SceneFlow Studio

A modern video production platform built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development with strict mode
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **ESLint** - Code linting with Next.js rules
- **Prettier** - Code formatting with Tailwind plugin

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
sceneflow-studio/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles with Tailwind directives
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── lib/             # Utility functions
├── prisma/          # Database schema (to be added)
├── public/          # Static assets
└── ...
```

## Components

The following shadcn/ui components are installed:

- Button
- Card
- Input
- Label
- Form

## Development

### Adding New Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

### Code Quality

All code is formatted with Prettier and linted with ESLint. Before committing:

```bash
# Format code
npm run format

# Check for lint errors
npm run lint
```

## Deployment

This project is ready for deployment on Vercel. Follow the standard Next.js deployment process.

## License

[Your License Here]
