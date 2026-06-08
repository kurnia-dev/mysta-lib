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
        pt?.root?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.className,
      )}
      style={pt?.root?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.style}
    >
      {/* Search Input Container */}
      <div
        className={clsx(
          preset.container?.className,
          pt?.container?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.className,
        )}
        style={pt?.container?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.style}
      >
        {/* Search Icon */}
        <Icon
          className={clsx(
            preset.searchIcon?.className,
            pt?.searchIcon?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.className,
          )}
          name="search"
          style={pt?.searchIcon?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.style}
        />

        {/* Input */}
        <input
          className={clsx(
            preset.input?.className,
            pt?.input?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.className,
          )}
          disabled={disabled}
          placeholder={placeholder}
          ref={inputRef}
          style={pt?.input?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.style}
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
              pt?.clearButton?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.className,
            )}
            disabled={disabled}
            style={pt?.clearButton?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.style}
            type="button"
            onClick={handleClear}
          >
            <Icon
              className={clsx(
                preset.clearIcon?.className,
                pt?.clearIcon?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.className,
              )}
              name="x"
              style={pt?.clearIcon?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.style}
            />
          </button>
        )}
      </div>

      {/* Cancel Button */}
      {showCancel && (
        <button
          className={clsx(
            preset.cancelButton?.className,
            pt?.cancelButton?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.className,
          )}
          disabled={disabled}
          style={pt?.cancelButton?.({ context: { disabled, hasValue: !!value, showCancel }, props: { size } })?.style}
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
