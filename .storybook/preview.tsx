import React, { useEffect } from 'react';

import type { Decorator, Preview } from '@storybook/react';

import { inari, kitsune, raijin, sakuragi, yuki, yurei } from '../presets';
import { MystaLibProvider } from '../library/context/LibContext';
import '../library/assets/css/main.css';
import '../presets/kitsune/index.css';

const presetMap: Record<string, Record<string, unknown>> = {
  kitsune,
  inari,
  raijin,
  sakuragi,
  yuki,
  yurei,
};

const withProviders: Decorator = (Story, { globals, parameters }) => {
  const selectedPreset = presetMap[globals.preset ?? 'kitsune'];
  const isDark = globals.darkMode === 'dark';
  const layout = parameters.layout ?? 'fullscreen';

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    return () => html.classList.remove('dark');
  }, [isDark]);

  const content = (
    <MystaLibProvider key={globals.preset ?? 'kitsune'} configOptions={{ preset: selectedPreset }}>
      <Story />
    </MystaLibProvider>
  );

  return (
    <React.StrictMode>
      {layout === 'centered' ? (
        content
      ) : (
        <div className="min-h-screen bg-white dark:bg-gray-950 p-6 transition-colors duration-300">
          {content}
        </div>
      )}
    </React.StrictMode>
  );
};

const preview: Preview = {
  globalTypes: {
    preset: {
      description: 'Component preset theme',
      defaultValue: 'kitsune',
      toolbar: {
        title: 'Preset',
        icon: 'paintbrush',
        items: ['kitsune', 'inari', 'raijin', 'sakuragi', 'yuki', 'yurei'],
        dynamicTitle: true,
      },
    },
    darkMode: {
      description: 'Dark mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withProviders],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'fullscreen',
    backgrounds: { disable: true },
  },
};

export default preview;
