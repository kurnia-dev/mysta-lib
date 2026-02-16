import {
  TabMenuPresetOptions,
  TabMenuProps,
} from 'lib/components/tabmenu/TabMenu.d';
import { ClassValue } from 'lib/hooks/useComponentPreset';

const commonClasses: ClassValue =
  'transition-all duration-200 ease-in-out cursor-pointer';

const pillClasses: ClassValue =
  'text-white text-sm font-light rounded-2xl py-1 px-3.5';

const boldUnderlineClasses: ClassValue =
  'text-sm font-semibold rounded-ss-md rounded-se-md flex items-center gap-1 text-secondary-200 border-b-[6px] border-b-secondary-100 pb-3 pt-1 px-2';

const thinUnderlineClasses: ClassValue =
  'relative flex items-center gap-1 text-sm font-semibold border-b-[3px] pb-3 pt-1 px-2';

const boxClasses: ClassValue =
  'text-sm font-medium flex flex-col items-center gap-1 text-secondary-500 p-2.5 m-1 rounded-md';

const segmentedClasses: ClassValue =
  'text-sm first:rounded-s-md flex items-center gap-1 last:rounded-e-md py-1 px-3';

const itemClasses = (type: TabMenuProps['type']): ClassValue => {
  let classes = commonClasses;

  if (type === 'pill') classes = classes + ' ' + pillClasses;
  if (type === 'bold-underline') classes = classes + ' ' + boldUnderlineClasses;
  if (type === 'thin-underline') classes = classes + ' ' + thinUnderlineClasses;
  if (type === 'box') classes = classes + ' ' + boxClasses;
  if (type === 'segmented') classes = classes + ' ' + segmentedClasses;
  return classes;
};

const preset: TabMenuPresetOptions = {
  root: ({ props: { type } }) => ({
    className: ['flex items-center', { '!gap-1': type === 'pill' }],
  }),
  icon: ({ props: { type } }) => ({
    className: [
      {
        'aria-selected:!text-white': type === 'segmented',
        'text-primary-400': type === 'thin-underline',
        'aria-selected:!text-primary-700 aria-[selected=false]:text-secondary-200':
          type === 'bold-underline',
      },
    ],
  }),
  item: ({ props: { type } }) => ({
    className: itemClasses(type),
  }),
  active: ({ props: { type } }) => ({
    className: [
      {
        'bg-primary-400 text-white': ['segmented', 'pill'].includes(type),
        'bg-secondary-200/30': type === 'box',
        'bg-transparent !text-primary-700 !border-b-primary-400 hover:bg-primary-50/70':
          type === 'bold-underline',
        'text-secondary-800 border-b-primary-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[80%] after:bg-gradient-to-t after:from-primary-400/60 after:hover:from-primary-500 after:opacity-30 after:to-transparent':
          type === 'thin-underline',
      },
    ],
  }),
  inactive: ({ props: { type } }) => ({
    className: [
      {
        'bg-transparent !text-black': type !== 'box',
        '!bg-secondary-50/70 hover:!bg-secondary-100/70': type === 'box',
        'hover:bg-secondary-50/90': type === 'bold-underline',
        'text-secondary-300 hover:text-primary-400/90 pt-0.5 px-2 cursor-pointer ':
          type === 'thin-underline',
      },
    ],
  }),
};

export default preset;
