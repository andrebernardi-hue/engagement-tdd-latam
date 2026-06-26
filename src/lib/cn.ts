import clsx, { type ClassValue } from 'clsx'

/** Class-name composer. Use for conditional Tailwind classes; never inline raw values. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
