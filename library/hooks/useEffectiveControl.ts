import { type Control, useForm } from 'react-hook-form';

import { useForm as useCustomForm } from 'lib/context';

export const useEffectiveControl = (): Control => {
  const fallbackForm = useForm();

  try {
    return useCustomForm().methods.control;
  } catch {
    return fallbackForm.control;
  }
};
