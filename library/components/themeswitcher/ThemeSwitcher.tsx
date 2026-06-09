import clsx from 'clsx';

import { useComponentPreset } from '../../hooks';

export interface ThemeOption {
  id: string;
  label: string;
  kanji?: string;
}

export interface ThemeSwitcherProps {
  themes: ThemeOption[];
  current: string;
  onChange: (id: string) => void;
  hint?: string;
  className?: string;
}

export function ThemeSwitcher({
  themes,
  current,
  onChange,
  hint = 'click → next',
  className,
}: ThemeSwitcherProps): JSX.Element {
  const preset =
    useComponentPreset('ThemeSwitcher', {
      props: { themes, current },
    }) ?? {};

  const currentTheme = themes.find((t) => t.id === current) ?? themes[0];

  const goNext = () => {
    const idx = themes.findIndex((t) => t.id === current);
    onChange(themes[(idx + 1) % themes.length].id);
  };

  return (
    <button
      aria-label="Switch theme"
      className={clsx(preset.root?.className, className)}
      type="button"
      onClick={goNext}
    >
      <div className="flex items-center gap-1.5">
        {currentTheme?.kanji && (
          <span className={clsx(preset.label?.className, 'opacity-60')}>{currentTheme.kanji}</span>
        )}
        <span className={clsx(preset.label?.className)}>{currentTheme?.label}</span>
      </div>
      <div className={clsx(preset.dots?.className)}>
        {themes.map((t) => (
          <span
            aria-hidden
            className={clsx(
              t.id === current ? preset.activeDot?.className : preset.inactiveDot?.className,
            )}
            key={t.id}
            onClick={(e) => { e.stopPropagation(); onChange(t.id); }}
          />
        ))}
      </div>
      {hint && <span className={clsx(preset.hint?.className)}>{hint}</span>}
    </button>
  );
}
