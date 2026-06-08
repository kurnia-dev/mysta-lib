# Mysta Lib Design System

## Overview
Mysta Lib is a React-based frontend monorepo containing a flexible Design System library, powered by Tailwind CSS, Radix UI, and Framer Motion. The core philosophy of this design system is strict separation of component logic and structural styles from theming and aesthetic presets. 

This repository is designed to be the single source of truth for UI components across multiple applications.

The project is structured as a monorepo using pnpm workspaces, primarily divided into:
- **`library/`**: Contains the core React components, hooks, contexts, and structural CSS.
- **`presets/`**: Contains various theme presets that dictate the visual appearance (colors, typography, spacing nuances, etc.) of the components.
- **`playground/`**: A Vite-based React application used for developing and testing the components.
- **`packages/mysta-lib/`**: The distributable package wrapper for the library.

---

## Architecture Deep Dive

### 1. Component Library (`library/`)
The library provides headless or semi-styled React components. It focuses on:
- **Accessibility & Interaction**: Utilizing Radix UI for robust accessible primitives.
- **Animation**: Using Framer Motion for micro-interactions and transitions.
- **Structure**: Defining the skeletal layout using Tailwind utility classes.

#### Anatomy of a Component
Each component resides in its own directory within `library/components/` (e.g., `library/components/button/`). A standard component consists of:
- `ComponentName.tsx`: The React component implementation.
- `ComponentName.d.ts`: TypeScript interfaces for the component's props and its preset options.
- `ComponentName.stories.tsx`: Storybook definitions for the component.

Inside a component, styles are resolved using the `useComponentPreset` hook:

```tsx
import clsx from 'clsx';
import { useComponentPreset } from 'lib/hooks';
import { ButtonProps } from './Button.d';

export const Button = (props: ButtonProps) => {
  const { label, severity = 'primary', className, pt, ...rest } = props;
  
  // Define context that might affect styling (like interaction states)
  const context = { disabled: props.disabled };

  // Fetch the preset classes and styles for this component
  const preset = useComponentPreset('Button', {
    context,
    props: { label, severity, ...rest },
  }) ?? {};

  return (
    <button
      {...preset.root}
      className={clsx(
        preset.root?.className, // Base preset classes
        className,              // User-provided classes
        pt?.root?.({ context, props })?.className // Pass-through overrides
      )}
      style={{ ...(preset.root?.style ?? {}), ...(pt?.root?.({ context, props })?.style ?? {}) }}
    >
      <span className={clsx(preset.label?.className)}>{label}</span>
    </button>
  );
};
```

#### The Pass-Through (`pt`) Pattern
To allow maximum flexibility, every component supports a `pt` (Pass-Through) prop. This allows consumers to inject custom Tailwind classes or inline styles directly into specific DOM elements within the component's internal structure without needing to create a new preset or wrap the component.

---

### 2. Preset System (`presets/`)
The design system supports multiple distinct visual themes, called "presets". The currently supported presets are:
- `kitsune` (Default)
- `yurei`, `raijin`, `inari`, `yuki`, `sakuragi`

Each preset is defined in the `presets/` directory.

#### Anatomy of a Preset
A preset folder (e.g., `presets/kitsune/`) contains:
- `tailwind.config.ts`: Tailwind configuration extending the base theme with preset-specific design tokens (colors, fonts, etc.).
- `index.css`: Global CSS variables for dynamic theming.
- Component-specific preset files (e.g., `button/index.ts`).
- `index.ts`: The main export aggregating all component presets.

A component preset maps the internal elements of a component to Tailwind classes dynamically based on the component's props and context:

```typescript
// presets/kitsune/button/index.ts
import { ButtonPresetOptions } from 'lib/components/button/Button.d';

const preset: ButtonPresetOptions = {
  root: ({ props, context }) => ({
    className: [
      'relative rounded-full text-xs transition-all duration-200',
      'items-center inline-flex justify-center',
      {
        'bg-primary-500 text-white hover:bg-primary-600': props.severity === 'primary',
        'pointer-events-none opacity-50': context.disabled,
      }
    ]
  }),
  label: ({ props }) => ({
    className: ['font-medium leading-4 tracking-[0.02em]']
  })
};

export default preset;
```

---

## How the Environment Works in Development

The local development environment uses a dynamic generation approach to seamlessly switch between presets without duplicating configuration files. This is managed by `scripts/dev.sh`.

### The Development Workflow

1. **Running the Dev Server**:
   ```bash
   pnpm dev --preset <preset_name>
   ```

2. **Validation & Dynamic Generation**:
   The `dev.sh` script dynamically generates:
   - **`tailwind.config.js`**: Imports the specific configuration of the chosen preset.
   - **`main.tsx`**: The Vite entry point. It imports the chosen preset's CSS and wraps the `App` inside `MystaLibProvider` with the active preset object.

3. **Running Vite**: Starts the Vite dev server (`vite --host`).

4. **Cleanup**: When stopped, generated files are removed.

---

## Consuming the Design System

When using Mysta Lib in an external application, you must wrap your application tree with the `MystaLibProvider` and pass the desired preset object.

```tsx
import React from 'react';
import { MystaLibProvider } from '@mystaline/mysta-lib/context';
import { kitsune } from '@mystaline/mysta-lib/presets';

// Import global and preset CSS
import '@mystaline/mysta-lib/library/assets/css/main.css';
import '@mystaline/mysta-lib/presets/kitsune/index.css';

const AppRoot = () => {
  return (
    <MystaLibProvider configOptions={{ preset: kitsune }}>
      <YourApplication />
    </MystaLibProvider>
  );
};
```

## Guidelines for Claude/AI Assistants

When generating or modifying code in this repository:
1. **Never hardcode aesthetic styles in `library/components/`**. Component files should only contain structural tailwind classes (like `flex`, `items-center`, `relative`) if absolutely necessary, but generally, ALL visual styling (colors, borders, specific padding/margins, typography) MUST go into the preset files.
2. **Always implement the `pt` pattern**. New components must expose a `pt` prop that allows styling overrides for every internal DOM element.
3. **Use Radix UI for complex accessibility primitives**. Do not build custom dropdowns, dialogs, or popovers from scratch if Radix UI provides a primitive.
4. **Follow the existing directory structure**. When adding a new component, create its folder in `library/components/`, define its `index.tsx`, `*.d.ts`, and `*.stories.tsx`, and then create its corresponding preset definition in *every* preset folder in `presets/`.
