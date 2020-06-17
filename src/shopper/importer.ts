const regex = /(.*) (\d+.*)/;

function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export function importText(
  rawText: string
): { name: string; quantity: string }[] {
  return rawText
    .split('\n')
    .map(txt => txt.trim())
    .filter(txt => txt.length > 0)
    .map(txt => {
      const match = txt.match(regex);
      if (!match) {
        return null;
      }
      const [, name, quantity] = match;
      return { name, quantity };
    })
    .filter(notNull);
}
