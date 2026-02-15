export interface FetchResponse<T = Record<string, unknown>> {
  data: T;
  status: number;
  message: string;
}
