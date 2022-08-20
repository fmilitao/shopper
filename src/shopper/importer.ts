const stringWithCheckbox = /(\[.{1,1}\]) (.*)/;
const stringWithCommentAtTheEnd = /(.*) (\d+.*)/;
const stringWithQuantityAtTheStart = /(\d+)[Xx] (.*)/;

function notNull<T>(value: T | null): value is T {
  return value !== null;
}

function maybeCheckbox(txt: string) {
  const withCheckbox = txt.match(stringWithCheckbox);
  if (withCheckbox !== null) {
    const [, checkboxText, rest] = withCheckbox;
    const enabled = '[ ]' === checkboxText;
    return { enabled, rest };
  }
  return { enabled: true, rest: txt };
}

function maybeComment(txt: string) {
  const matchWithQuantityAtTheStart = txt.match(stringWithQuantityAtTheStart);
  if (matchWithQuantityAtTheStart !== null) {
    const [, comment, name] = matchWithQuantityAtTheStart;
    return { name, comment };
  }
  const matchCommentAtTheEnd = txt.match(stringWithCommentAtTheEnd);
  if (matchCommentAtTheEnd !== null) {
    const [, name, comment] = matchCommentAtTheEnd;
    return { name, comment };
  }
  return { name: txt, comment: '' };
}

export function importText(
  rawText: string
): { name: string; comment: string; enabled: boolean }[] {
  return rawText
    .split('\n')
    .map(txt => txt.trim())
    .filter(txt => txt.length > 0)
    .map(txt => {
      const { enabled, rest } = maybeCheckbox(txt);
      const { name, comment } = maybeComment(rest);
      return { name, comment, enabled };
    })
    .filter(notNull);
}

export function exportText(
  items: { name: string; comment: string; enabled: boolean }[]
): string {
  return items
    .map(({ name, comment, enabled }) => {
      const checkbox = enabled ? '[ ]' : '[X]';
      const cleanedComment = comment.length !== 0 ? ` ${comment}` : comment;
      return `${checkbox} ${name}${cleanedComment}`;
    })
    .join('\n');
}
