import { ReactNode } from 'react';

/**
 * Convert an array of [value, label] to select options.
 */
export function arrayToOptions<Val>(arr: [Val, ReactNode][]) {
  return arr.map(([value, label]) => ({
    value,
    label,
  }));
}

/**
 * Convert an object of value -> label mapping to select options.
 */
export function objectToOptions<K extends string>(obj: Record<K, ReactNode>) {
  return arrayToOptions(Object.entries<ReactNode>(obj) as [K, ReactNode][]);
}
