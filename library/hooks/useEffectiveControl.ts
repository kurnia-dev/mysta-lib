import { type Control, useForm } from 'react-hook-form';
import { useForm as useCustomForm } from 'lib/context';

export const useEffectiveControl = (): Control => {
  try {
    return useCustomForm().methods.control;
  } catch {
    //
  }

  try {
    return useForm().control;
  } catch {
    //
  }
};
