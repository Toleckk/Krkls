export type Exact<T, U> = T extends Record<string, unknown>
  ? T extends U
    ? Exclude<keyof T, keyof U> extends never
      ? {[K in keyof U]: Exact<T[K], U[K]>}
      : never
    : never
  : T
