import { Select } from 'radix-ui';

import { Option } from './Dropdown.d';

export const DropdownItem = (
  props: Omit<Option, 'value'> & { value: string },
): JSX.Element => {
  const { label, value } = props;

  return (
    <Select.Item value={value}>
      <Select.ItemText>{label}</Select.ItemText>
    </Select.Item>
  );
};
