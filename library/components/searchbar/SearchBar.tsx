import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import { useComponentPreset } from 'lib/hooks';

import { Icon } from '../icon/Icon';

import { SearchBarProps } from './SearchBar.d';

export const SearchBar = (props: SearchBarProps): JSX.Element => {
  const {
    value,
    onChange,
    placeholder = 'Search...',
    showCancel = false,
    onCancel,
    showClear = true,
    onClear,
    autoFocus = false,
    size = 'md',
    disabled = false,
    className,
    pt,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const preset =
    useComponentPreset('SearchBar', {
      props: { size },
      context: { disabled, hasValue: !!value, showCancel },
    }) ?? {};

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleClear = () => {
    onChange('');
    if (onClear) {
      onClear();
    }
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    onChange('');
    if (onCancel) {
      onCancel();
    }
    inputRef.current?.blur();
  };

  return (
    <div
      className={clsx(
        preset.root?.className,
        className,
        pt?.root?.({ props: { size } })?.className,
      )}
    >
      {/* Search Input Container */}
      <div
        className={clsx(
          preset.container?.className,
          pt?.container?.({ props: { size } })?.className,
        )}
      >
        {/* Search Icon */}
        <Icon
          className={clsx(
            preset.searchIcon?.className,
            pt?.searchIcon?.({ props: { size } })?.className,
          )}
          name="search"
        />

        {/* Input */}
        <input
          className={clsx(
            preset.input?.className,
            pt?.input?.({ props: { size } })?.className,
          )}
          disabled={disabled}
          placeholder={placeholder}
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* Clear Button */}
        {showClear && value && (
          <button
            aria-label="Clear search"
            className={clsx(
              preset.clearButton?.className,
              pt?.clearButton?.({ props: { size } })?.className,
            )}
            disabled={disabled}
            type="button"
            onClick={handleClear}
          >
            <Icon
              className={clsx(
                preset.clearIcon?.className,
                pt?.clearIcon?.({ props: { size } })?.className,
              )}
              name="x"
            />
          </button>
        )}
      </div>

      {/* Cancel Button */}
      {showCancel && (
        <button
          className={clsx(
            preset.cancelButton?.className,
            pt?.cancelButton?.({ props: { size } })?.className,
          )}
          disabled={disabled}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
