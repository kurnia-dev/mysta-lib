import { Path, PathValue } from 'react-hook-form';

export type FieldPathValue<T> = PathValue<
  Record<string, T>,
  Path<Record<string, T>>
>;
