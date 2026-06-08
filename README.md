# Mysta Lib

Mysta Lib is a React-based frontend monorepo containing a flexible, themable Design System library. It utilizes Tailwind CSS, Radix UI, and Framer Motion to provide robust, accessible, and highly customizable UI components.

## Project Architecture

This monorepo is divided into three main parts:
- **`library/`**: The core headless and structurally styled React components, contexts, and hooks.
- **`presets/`**: A collection of visual themes (`kitsune`, `yurei`, `raijin`, `inari`, `yuki`, `sakuragi`) that dictate the aesthetic of the components.
- **`playground/`**: A Vite application to develop, test, and preview the components in isolation.

For a detailed explanation of the design system architecture and how presets work under the hood, please refer to the [Design System Documentation](./design.md).

## Development

The development server uses a dynamic script to allow you to run the playground with a specific theme preset.

### Starting the Dev Server

To start the development server with the default preset (`kitsune`):

```bash
pnpm dev
```

To start the development server with a specific preset:

```bash
pnpm dev --preset <preset_name>
```

**Supported Presets:** `kitsune`, `yurei`, `raijin`, `inari`, `yuki`, `sakuragi`

### Scripts

- `pnpm dev`: Start the playground development server.
- `pnpm build`: Build the entire project including presets and the playground.
- `pnpm storybook`: Start the Storybook server for component documentation.
- `pnpm lint`: Run ESLint across the codebase.
