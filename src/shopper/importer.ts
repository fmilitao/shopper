const regex = /(.*) (\d+.*)/;
export function importText(rawText: string) {
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
    .filter(value => value !== null);
}
