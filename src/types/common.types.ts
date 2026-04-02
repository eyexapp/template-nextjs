/** Make all properties nullable */
export type Nullable<T> = T | null;

/** Make specific properties optional */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Extract the resolved type from a Promise */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/** Make all properties required and non-nullable */
export type Strict<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

/** Dictionary type with string keys */
export type Dictionary<T = unknown> = Record<string, T>;
