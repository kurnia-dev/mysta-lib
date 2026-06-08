import { resolve } from 'path';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../library/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => !prop.parent?.fileName.includes('node_modules'),
    },
  },
  viteFinal(config) {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      lib: resolve(__dirname, '../library'),
      packages: resolve(__dirname, '../packages'),
    };

    // Allow Vite to serve all files under the project root
    config.server ??= {};
    config.server.fs ??= {};
    config.server.fs.allow = [
      ...(config.server.fs.allow ?? []),
      resolve(__dirname, '..'),
    ];

    // Prevent Babel/SWC from parsing .d.ts declaration files (must run before transform plugins)
    config.plugins = [
      {
        name: 'ignore-dts',
        enforce: 'pre' as const,
        resolveId(id: string) {
          if (id.endsWith('.d.ts') || id.endsWith('.d')) return id;
        },
        load(id: string) {
          if (id.endsWith('.d.ts') || id.endsWith('.d')) return { code: 'export {}' };
        },
        transform(_code: string, id: string) {
          if (id.endsWith('.d.ts') || id.endsWith('.d')) return { code: 'export {}' };
        },
      },
      ...(config.plugins ?? []),
    ];

    return config;
  },
};

export default config;
