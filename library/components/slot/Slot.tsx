import { SlotProps } from './Slot.d';

export const Slot: React.FC<SlotProps> = ({ children, slots, name }) => {
  if (name && slots?.[name]) return <>{slots[name]}</>;
  return <>{children}</>;
};
