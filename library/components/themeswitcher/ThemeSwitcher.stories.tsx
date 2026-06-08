import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ThemeOption, ThemeSwitcher } from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Navigation/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**ThemeSwitcher** is a compact cycle-button that rotates through an ordered list of named themes.
Each click advances to the next theme in the list (wrapping around); individual dot indicators can also be clicked directly to jump to any theme.
Pass an optional \`kanji\` string on each \`ThemeOption\` to display a decorative glyph beside the label — the library's own preset themes use Japanese kanji.
The \`hint\` prop (default: "click → next") shows a small instructional text for first-time users; hide it by passing \`hint=""\`.
Use this wherever the active preset or colour scheme needs to be surfaced to the user — app header, settings panel, or a demo toolbar.
        `,
      },
    },
  },
  argTypes: {
    hint: {
      control: 'text',
      description: 'Small instructional label shown beside the dots. Pass an empty string to hide.',
      table: { defaultValue: { summary: 'click → next' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const libraryPresets: ThemeOption[] = [
  { id: 'kitsune', kanji: '狐', label: 'Kitsune' },
  { id: 'inari', kanji: '稲荷', label: 'Inari' },
  { id: 'raijin', kanji: '雷神', label: 'Raijin' },
  { id: 'sakuragi', kanji: '桜木', label: 'Sakuragi' },
  { id: 'yuki', kanji: '雪', label: 'Yuki' },
  { id: 'yurei', kanji: '幽霊', label: 'Yurei' },
];

const lightDarkSystem: ThemeOption[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
];

const twoThemes: ThemeOption[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

const brandThemes: ThemeOption[] = [
  { id: 'ocean', label: 'Ocean' },
  { id: 'forest', label: 'Forest' },
  { id: 'sunset', label: 'Sunset' },
  { id: 'midnight', label: 'Midnight' },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All six library presets. Click the button to cycle to the next theme, or click any dot to jump directly.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('kitsune');
    return (
      <div className="space-y-2 text-center">
        <ThemeSwitcher current={current} themes={libraryPresets} onChange={setCurrent} />
        <p className="text-xs text-gray-400">Current: {current}</p>
      </div>
    );
  },
};

export const WithKanji: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Themes with `kanji` set — a decorative glyph is shown at reduced opacity beside the label.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('kitsune');
    return <ThemeSwitcher current={current} themes={libraryPresets} onChange={setCurrent} />;
  },
};

export const WithLabelsOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Themes without `kanji` — only the label is displayed. Suitable for non-themed or brand-name presets.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('kitsune');
    return (
      <ThemeSwitcher
        current={current}
        themes={libraryPresets.map(({ id, label }) => ({ id, label }))}
        onChange={setCurrent}
      />
    );
  },
};

export const LightDarkSystem: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three-option light / dark / system switcher — the most common usage in SaaS apps without custom theming.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('light');
    return (
      <div className="space-y-2 text-center">
        <ThemeSwitcher current={current} themes={lightDarkSystem} onChange={setCurrent} />
        <p className="text-xs text-gray-400">Active: {current}</p>
      </div>
    );
  },
};

export const TwoThemes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimum setup: two themes — clicking toggles between Light and Dark.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('light');
    return <ThemeSwitcher current={current} themes={twoThemes} onChange={setCurrent} />;
  },
};

export const BrandThemes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Custom brand-named themes without kanji — Ocean, Forest, Sunset, Midnight.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('ocean');
    return <ThemeSwitcher current={current} themes={brandThemes} onChange={setCurrent} />;
  },
};

export const NoHint: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `hint=""` to hide the instructional "click → next" label — useful in tight UI spaces.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('kitsune');
    return <ThemeSwitcher current={current} hint="" themes={libraryPresets} onChange={setCurrent} />;
  },
};

export const CustomHint: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Override the default hint text with a custom instruction string.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('kitsune');
    return <ThemeSwitcher current={current} hint="switch theme" themes={libraryPresets} onChange={setCurrent} />;
  },
};

export const PreSelectedMid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Initialised to the third preset (Raijin) — shows the dot indicator on a middle item.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('raijin');
    return <ThemeSwitcher current={current} themes={libraryPresets} onChange={setCurrent} />;
  },
};

export const WithCallback: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `onChange` callback is called with the new theme ID on every switch. The log below shows each call.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('kitsune');
    const [log, setLog] = useState<string[]>([]);

    const handleChange = (id: string) => {
      setCurrent(id);
      setLog((prev) => [`Switched to: ${id}`, ...prev.slice(0, 4)]);
    };

    return (
      <div className="space-y-4 min-w-[260px]">
        <ThemeSwitcher current={current} themes={libraryPresets} onChange={handleChange} />
        <div className="space-y-1 min-h-[80px]">
          {log.length === 0 && (
            <p className="text-xs text-gray-400">Click the switcher — onChange calls appear here.</p>
          )}
          {log.map((entry, i) => (
            <p className="text-xs font-mono text-gray-500" key={i}>{entry}</p>
          ))}
        </div>
      </div>
    );
  },
};

export const InHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: 'ThemeSwitcher embedded in a realistic app header alongside a title and action icons. This is the canonical placement.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('kitsune');

    return (
      <div className="w-full max-w-2xl">
        <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Workspace Pro</h1>
            <p className="text-xs text-gray-400">Marketing team</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher current={current} hint="" themes={libraryPresets} onChange={setCurrent} />
            <button
              aria-label="Notifications"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              type="button"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <button
              aria-label="Account"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              type="button"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </header>
        <div className="p-4 text-xs text-gray-400">
          Active preset: <span className="font-medium text-gray-600 dark:text-gray-300">{current}</span>
        </div>
      </div>
    );
  },
};

export const InSettingsPanel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'ThemeSwitcher as a settings row — label on the left, switcher on the right. Common in preferences or profile pages.',
      },
    },
  },
  render: () => {
    const [current, setCurrent] = useState('kitsune');

    return (
      <div className="w-80 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Appearance</h3>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Theme</p>
            <p className="text-xs text-gray-400">Choose your colour preset</p>
          </div>
          <ThemeSwitcher current={current} hint="" themes={libraryPresets} onChange={setCurrent} />
        </div>
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Mode</p>
            <p className="text-xs text-gray-400">Light or dark colour scheme</p>
          </div>
          <ThemeSwitcher current="light" hint="" themes={lightDarkSystem} onChange={() => {}} />
        </div>
      </div>
    );
  },
};
