// isEmail
export const isEmail = (value: string): boolean => /.+@.+\..+/.test(value);

export function getInitials(name: string): string {
  if (!name) return '';
  const words = name.trim().split(/\s+/);
  return words.slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('');
}
