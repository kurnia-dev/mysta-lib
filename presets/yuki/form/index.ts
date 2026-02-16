import { FormPresetOptions } from 'lib/components/form/Form.d';

const preset: FormPresetOptions = {
  root: {
    className: 'w-full',
  },
  wrapper: ({ props }) => ({
    className: [
      {
        'grid gap-x-2 gap-y-2': props.columnPerRow > 1,
        'flex flex-col gap-2 w-full': props.columnPerRow === 1,
      },
    ],
    style: {
      gridTemplateColumns:
        props.columnPerRow > 1
          ? `repeat(${props.columnPerRow}, minmax(0, 1fr))`
          : undefined,
    },
  }),
  footer: {
    className: ['col-span-2 gap-1 flex justify-end w-full'],
  },
};

export default preset;
