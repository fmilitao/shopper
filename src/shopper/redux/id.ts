const timestamp = Date.now().toString(36);
let counter = 0;

export default function newId(prefix: string) {
  return `${prefix}(${timestamp}:${counter++})`;
}

export const LIST_ID_PREFIX = 'list-id';
export const ITEM_ID_PREFIX = 'item-id';

export const newListId = () => newId(LIST_ID_PREFIX);
export const newItemId = () => newId(ITEM_ID_PREFIX);
