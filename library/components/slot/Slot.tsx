import { SlotProps } from './Slot.d';

export const Slot = ({ children, slots, name }: SlotProps) => {
  if (name && slots?.[name]) return <>{slots[name]}</>;
  return <>{children}</>;
};
