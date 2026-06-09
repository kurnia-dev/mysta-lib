import { ReactNode } from 'react';

import { ModelValue, PresetMethodAttributes, PresetOptions, ResolvedPresetOptions } from '../../hooks';
import { FetchResponse } from '../../types/response.type';

export type TableResponse<T> = FetchResponse<{
  data: T[];
  totalRecords: number;
}>;

export type QueryParams<
  T extends Record<string, string> = Record<string, string>,
> = T;

export interface TableColumn<T> {
  field: keyof T;
  dataType: 'string' | 'number' | 'boolean' | 'array';
  header?: string;
  info?: string;

  sortable?: boolean;
  lockable?: boolean;
  reorderable?: boolean;

  headerCellRender?: () => ReactNode | string;
  bodyCellRender?: (data: T, index: number) => ReactNode | string;
}

interface PaginationProps {
  mode: 'paginate';
  defaultRow?: 10;
  rowsOptions?: (5 | 10 | 25 | 50 | 100 | 200)[];
  navigation?: ('prev' | 'next' | 'input' | 'first' | 'last')[];
  preserve?: boolean;
}

interface NoPaginationProps {
  mode: 'infinite-scroll';
}

interface DataProps<T> {
  fetchFunction?: (params?: QueryParams) => Promise<TableResponse<T>>;
  filterFields?: Partial<T>[];
  staticFilter?: boolean;
  lazy?: boolean;
  columns: TableColumn<T>[];
}

interface StaticProps<T> {
  data?: T[];
  searchAbleFields?: keyof T;
}

interface MultiSelection<T> extends BaseTableProps<T> {
  selectionMode: 'multi';
  selection?: ModelValue<T[]>;
}

interface SingleSelection<T> extends BaseTableProps<T> {
  selectionMode: 'single';
  selection?: ModelValue<T>;
}

interface NoSelection<T> extends BaseTableProps<T> {
  selectionMode?: 'none';
}

type SelectionTableProps<T> =
  | NoSelection<T>
  | SingleSelection<T>
  | MultiSelection<T>;

interface BaseTableProps<T> extends DataProps<T>, StaticProps<T> {
  className?: string;
  pt?: TablePresetOptions;
}

type PaginationTableProps<T> = SelectionTableProps<T> & PaginationProps;
type NoPaginationTableProps<T> = SelectionTableProps<T> & NoPaginationProps;

export type TableProps<T> = PaginationTableProps<T> | NoPaginationTableProps<T>;

export interface TablePresetOptions {
  root?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
  table?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
  header?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
  headerRow?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
  headerCell?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
  body?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
  bodyRow?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
  bodyCell?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
  menuTrigger?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
  selection?: PresetMethodAttributes<ResolvedPresetOptions<'Table'>>;
}
