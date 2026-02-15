import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ModelValue<T = any> {
  get: () => T;
  set: (newValue: T) => void;
}

export const useModelValue = <T>(defaultValue: T = null): ModelValue<T> => {
  const [modelValue, setModelValue] = useState<T>(defaultValue);

  const get = () => modelValue;
  const set = (newValue: T) => {
    setModelValue(newValue);
  };

  return { get, set };
};
