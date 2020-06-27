const timestamp = Date.now().toString(36);
let counter = 0;

export default function newId(prefix: string | undefined) {
  const finalPrefix = prefix === undefined ? '' : `${prefix}-`;
  return `${finalPrefix}id(${timestamp}:${counter++})`;
}

export const newListId = () => newId('list');
export const newItemId = () => newId('item');
