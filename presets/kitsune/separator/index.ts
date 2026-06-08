import type { PresetOptions } from 'lib/hooks/useComponentPreset';

const preset = {
  root: (options: PresetOptions<'Separator'>) => {
    const isVertical = options.props?.orientation === 'vertical';
    return {
      className: isVertical
        ? ['h-full w-px bg-secondary-200 mx-2']
        : ['w-full h-px bg-secondary-200 my-2'],
    };
  },
};

export default preset;
