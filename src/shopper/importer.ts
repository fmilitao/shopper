const regex = /(.*) (\d+.*)/;

function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export function importText(
  rawText: string
): { name: string; comment: string }[] {
  return rawText
    .split('\n')
    .map(txt => txt.trim())
    .filter(txt => txt.length > 0)
    .map(txt => {
      const match = txt.match(regex);
      if (!match) {
        return { name: txt, comment: '' };
      }
      const [, name, comment] = match;
      return { name, comment };
    })
    .filter(notNull);
}
