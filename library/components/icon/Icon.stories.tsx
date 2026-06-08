import type { Meta, StoryObj } from '@storybook/react';

import type { Icons } from './Icon.d';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Preset/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Icon** renders a CSS-mask-based SVG icon from the built-in icon set. Each icon is identified by a \`name\` key from the \`IconMap\` interface. Size is controlled via Tailwind width/height classes on \`className\` (e.g. \`w-4\`, \`w-6\`, \`w-8\`). Color follows \`currentColor\` — set it via \`text-*\` utilities or the \`severity\` shorthand prop.

An optional \`tooltip\` prop shows a floating label; \`tooltipPos\` accepts \`top\`, \`right\`, \`bottom\`, or \`left\`.

**Extending the icon set**: declare additional keys in \`IconMap\` and add a corresponding \`.ic-<name>\` CSS class with a \`--svg\` mask URL. The \`Icon\` component will then accept the new name with full TypeScript type-safety. See the JSDoc in \`Icon.d.ts\` for the full pattern.
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'plus', 'minus', 'minus-4', 'info', 'eye-on', 'eye-off', 'check', 'check-4',
        'x', 'circle', 'circle-fill', 'edit', 'edit-2', 'edit-3', 'trash', 'trash-2',
        'settings', 'settings-2', 'user-circle', 'sort-asc', 'sort-desc',
        'chevron-down', 'chevron-up', 'menu', 'users-round', 'message-square-text',
        'double-check', 'image', 'users', 'ban', 'leave', 'send', 'unsend',
        'user-add', 'user-remove', 'user-check', 'user-x', 'user-pen', 'copy',
        'search', 'chevron-left', 'chevron-right', 'home', 'list', 'dollar',
        'bell', 'user', 'calendar', 'filter', 'refresh-cw', 'alert-circle',
        'alert-triangle', 'shopping-bag', 'check-circle', 'clock',
      ] satisfies Icons[],
      description: 'Icon identifier — one of the keys from `IconMap`.',
    },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info'],
      description: 'Color severity applied to the icon mask.',
      table: { defaultValue: { summary: 'undefined (inherits currentColor)' } },
    },
    tooltipPos: {
      control: 'radio',
      options: ['top', 'right', 'bottom', 'left'],
      table: { defaultValue: { summary: 'right' } },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

// ---------------------------------------------------------------------------
// Default — single icon, Controls tab wired
// ---------------------------------------------------------------------------
export const Default: Story = {
  args: {
    name: 'check-circle',
  },
};

// ---------------------------------------------------------------------------
// WithTooltip — tooltip on four positions
// ---------------------------------------------------------------------------
export const WithTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Hover each icon to see the tooltip. The `tooltipPos` prop accepts `top`, `right`, `bottom`, and `left`. The default position is `right`.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-8 p-8">
      {(['top', 'right', 'bottom', 'left'] as const).map((pos) => (
        <div key={pos} className="flex flex-col items-center gap-2">
          <Icon name="info" tooltip={`Tooltip — ${pos}`} tooltipPos={pos} />
          <span className="text-[0.65rem] text-gray-400">{pos}</span>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithSeverity — all 6 severity values side by side
// ---------------------------------------------------------------------------
export const WithSeverity: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The `severity` prop applies a preset color to the icon mask. Use it to convey status at a glance without adding extra Tailwind classes.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-1.5">
          <Icon name="circle-fill" severity={s} className="w-6 h-6" />
          <span className="text-[0.65rem] text-gray-400">{s}</span>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// AllSizes — four size steps via className
// ---------------------------------------------------------------------------
export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Icon size is controlled entirely via Tailwind width/height utilities on `className`. There is no size prop — this keeps the API minimal and composable.',
      },
    },
  },
  render: () => (
    <div className="flex items-end gap-6">
      {[
        { cls: 'w-4 h-4', label: 'w-4 (16 px)' },
        { cls: 'w-6 h-6', label: 'w-6 (24 px)' },
        { cls: 'w-8 h-8', label: 'w-8 (32 px)' },
        { cls: 'w-10 h-10', label: 'w-10 (40 px)' },
      ].map(({ cls, label }) => (
        <div key={cls} className="flex flex-col items-center gap-1.5">
          <Icon name="bell" className={cls} />
          <span className="text-[0.65rem] text-gray-400">{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// IconCatalog — ALL icons from IconMap in a browsable grid
// ---------------------------------------------------------------------------
const ALL_ICONS: Icons[] = [
  'plus', 'minus', 'minus-4', 'info', 'eye-on', 'eye-off', 'check', 'check-4',
  'x', 'circle', 'circle-fill', 'edit', 'edit-2', 'edit-3', 'trash', 'trash-2',
  'settings', 'settings-2', 'user-circle', 'sort-asc', 'sort-desc',
  'chevron-down', 'chevron-up', 'menu', 'users-round', 'message-square-text',
  'double-check', 'image', 'users', 'ban', 'leave', 'send', 'unsend',
  'user-add', 'user-remove', 'user-check', 'user-x', 'user-pen', 'copy',
  'search', 'chevron-left', 'chevron-right', 'home', 'list', 'dollar',
  'bell', 'user', 'calendar', 'filter', 'refresh-cw', 'alert-circle',
  'alert-triangle', 'shopping-bag', 'check-circle', 'clock',
];

export const IconCatalog: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Complete catalog of every icon available in `IconMap`. Use this as a visual reference when picking an icon for your UI. Copy the `name` value shown below each icon.',
      },
    },
  },
  render: () => (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {ALL_ICONS.length} icons available — hover for tooltip with icon name.
      </p>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
        {ALL_ICONS.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-default"
          >
            <Icon name={name} className="w-6 h-6" tooltip={name} tooltipPos="top" />
            <span className="text-[0.6rem] text-gray-500 dark:text-gray-400 text-center break-all leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// CustomColor — Tailwind text-* utilities for any color
// ---------------------------------------------------------------------------
export const CustomColor: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Because the icon mask inherits `currentColor`, any Tailwind `text-*` class or inline `color` style applies to the icon. This enables one-off colors beyond the six severity presets.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-1.5">
        <Icon name="check-circle" className="w-7 h-7 text-emerald-500" />
        <span className="text-[0.65rem] text-gray-400">text-emerald-500</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Icon name="alert-triangle" className="w-7 h-7 text-amber-400" />
        <span className="text-[0.65rem] text-gray-400">text-amber-400</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Icon name="user-circle" className="w-7 h-7 text-violet-500" />
        <span className="text-[0.65rem] text-gray-400">text-violet-500</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Icon name="shopping-bag" className="w-7 h-7 text-pink-500" />
        <span className="text-[0.65rem] text-gray-400">text-pink-500</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Icon name="clock" className="w-7 h-7 text-sky-500" />
        <span className="text-[0.65rem] text-gray-400">text-sky-500</span>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// InContext — icons embedded in realistic UI patterns
// ---------------------------------------------------------------------------
export const InContext: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Icons composing with other UI elements: a navigation list with leading icons and a button-like row with a trailing action icon. This is the most common real-world usage pattern.',
      },
    },
  },
  render: () => {
    const navItems: Array<{ name: Icons; label: string; badge?: string }> = [
      { name: 'home', label: 'Dashboard' },
      { name: 'users', label: 'Team Members', badge: '12' },
      { name: 'calendar', label: 'Schedule' },
      { name: 'shopping-bag', label: 'Orders', badge: '3' },
      { name: 'settings', label: 'Settings' },
    ];

    const recentFiles = [
      { name: 'Q1 Financial Report.xlsx', icon: 'list' as Icons },
      { name: 'Design System v2.fig', icon: 'image' as Icons },
      { name: 'Roadmap 2025.pdf', icon: 'calendar' as Icons },
    ];

    return (
      <div className="flex gap-8 flex-wrap">
        {/* Navigation list */}
        <div className="w-52">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Navigation</p>
          <nav className="space-y-0.5">
            {navItems.map(({ name, label, badge }) => (
              <div
                key={label}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon name={name} className="w-4 h-4 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                    {label}
                  </span>
                </div>
                {badge && (
                  <span className="text-[0.6rem] font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full px-1.5 py-0.5">
                    {badge}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Recent files list */}
        <div className="flex-1 min-w-48">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Recent Files</p>
          <ul className="space-y-1">
            {recentFiles.map(({ name, icon }) => (
              <li
                key={name}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon name={icon} className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{name}</span>
                </div>
                <Icon
                  name="copy"
                  className="w-4 h-4 text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  tooltip="Copy path"
                  tooltipPos="left"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// AlertStates — icons paired with semantic alert banners
// ---------------------------------------------------------------------------
export const AlertStates: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'A practical composition pattern: severity icons paired with alert banner backgrounds. Demonstrates how `severity` on `Icon` aligns with the surrounding color system.',
      },
    },
  },
  render: () => {
    const alerts: Array<{ icon: Icons; severity: 'success' | 'warning' | 'danger' | 'info'; message: string }> = [
      { icon: 'check-circle', severity: 'success', message: 'Asset registration completed. Tag AST-20250088 is now active.' },
      { icon: 'info', severity: 'info', message: 'Scheduled maintenance window on Saturday, 00:00–04:00 WIB.' },
      { icon: 'alert-triangle', severity: 'warning', message: '3 assets are approaching their warranty expiry date.' },
      { icon: 'alert-circle', severity: 'danger', message: 'Sync failed: Unable to reach the remote inventory service.' },
    ];

    const bgMap = {
      success: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800',
      info: 'bg-info-50 dark:bg-info-900/20 border-info-200 dark:border-info-800',
      warning: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800',
      danger: 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800',
    } as const;

    const textMap = {
      success: 'text-success-700 dark:text-success-300',
      info: 'text-info-700 dark:text-info-300',
      warning: 'text-warning-700 dark:text-warning-300',
      danger: 'text-danger-700 dark:text-danger-300',
    } as const;

    return (
      <div className="space-y-3 w-full max-w-lg">
        {alerts.map(({ icon, severity, message }) => (
          <div
            key={severity}
            className={`flex items-start gap-3 border rounded-lg px-4 py-3 ${bgMap[severity]}`}
          >
            <Icon name={icon} severity={severity} className="w-4 h-4 mt-0.5 shrink-0" />
            <p className={`text-sm ${textMap[severity]}`}>{message}</p>
          </div>
        ))}
      </div>
    );
  },
};
