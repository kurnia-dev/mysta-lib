import clsx from 'clsx';

import { useComponentPreset, useEscapeKey, useScrollLock } from 'lib/hooks';

export interface ShortcutItem {
  key: string | string[];
  label: string;
  global?: boolean;
}

export interface ShortcutSection {
  title: string;
  shortcuts: ShortcutItem[];
}

export interface KeyboardHelpProps {
  sections?: ShortcutSection[];
  shortcuts?: ShortcutItem[];
  open: boolean;
  onClose: () => void;
  className?: string;
}

function KeyBadge({ k, preset }: { k: string; preset: Record<string, { className?: string }> }): JSX.Element {
  return (
    <kbd className={clsx(preset.keyBadge?.className)}>
      {k}
    </kbd>
  );
}

export function KeyboardHelp({
  sections,
  shortcuts,
  open,
  onClose,
  className,
}: KeyboardHelpProps): JSX.Element | null {
  useEscapeKey(onClose, open);
  useScrollLock(open);

  const preset = useComponentPreset('KeyboardHelp', {
    props: { sections, shortcuts, open, onClose, className },
  }) ?? {};

  if (!open) return null;

  const resolvedSections: ShortcutSection[] = sections ?? (shortcuts ? [{ title: 'Shortcuts', shortcuts }] : []);

  return (
    <>
      {/* Backdrop: aria-hidden removes from a11y tree, handles click-away */}
      <div
        aria-hidden
        className={clsx(preset.backdrop?.className)}
        onClick={onClose}
      />
      {/* Dialog: positioned above backdrop, no click handler */}
      <div
        aria-modal
        aria-label="Keyboard shortcuts"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        role="dialog"
      >
      <div
        className={clsx(
          preset.panel?.className,
          className,
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-secondary-200">
          <h3 className="text-sm font-semibold">Keyboard Shortcuts</h3>
          <button
            aria-label="Close"
            className="text-secondary-400 hover:text-secondary-600 text-lg leading-none"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh] p-5 space-y-5">
          {resolvedSections.map((section) => (
            <div key={section.title}>
              <div className={clsx(preset.sectionTitle?.className)}>
                {section.title}
              </div>
              <div className="space-y-2">
                {section.shortcuts.map((s, i) => (
                  <div className="flex items-center justify-between text-sm" key={i}>
                    <span className={clsx(preset.shortcutLabel?.className)}>{s.label}</span>
                    <div className="flex items-center gap-1">
                      {(Array.isArray(s.key) ? s.key : [s.key]).map((k) => (
                        <KeyBadge k={k} key={k} preset={preset} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-secondary-200 text-[0.65rem] text-secondary-400 text-center">
          press ? or Esc to close
        </div>
      </div>
      </div>
    </>
  );
}
