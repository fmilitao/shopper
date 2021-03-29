import { ITEM_ID_PREFIX, LIST_ID_PREFIX } from './redux/id';
import { validate } from './redux/localStorage';
import { ShopperState } from './redux/state';

export function deserialize(values: string[][]): ShopperState {
  const [internal, headers, ...others] = values;
  const normalized = others.map((row: string[]) =>
    headers.reduce((accumulator: any, key: string, i: number) => {
      if (row[i] !== undefined && row[i] !== '') {
        accumulator[key] = row[i];
        // special parsing for boolean entry
        if (key === 'enabled') {
          accumulator[key] = accumulator[key] === 'true';
        }
      }
      return accumulator;
    }, {})
  );
  const lists = normalized
    .filter(elem => elem.id.startsWith(LIST_ID_PREFIX))
    .map(list => {
      list.items = normalized
        .filter(
          item => item.id.startsWith(ITEM_ID_PREFIX) && item.listId === list.id
        )
        .map(item => {
          delete item.listId;
          return item;
        });
      return list;
    });

  const settings = Object.fromEntries(
    internal.map(text => JSON.parse(text)).map(({ key, value }) => [key, value])
  );

  return validate({
    lists,
    ...settings,
  });
}

export function serialize(state: ShopperState, simplify: boolean): string[][] {
  const simplifierCounter = new Map<string, number>();
  const simplifierMap = new Map<string, string>();
  const simplifyListId = simplify
    ? (id: string, prefix: string) => {
        if (simplifierMap.has(id)) {
          return simplifierMap.get(id);
        }
        const count = (simplifierCounter.get(prefix) ?? 0) + 1;
        const simplerId = `${prefix}-${count}`;
        simplifierCounter.set(prefix, count);
        simplifierMap.set(id, simplerId);
        return simplerId;
      }
    : (id: string) => id;

  const normalizedLists = state.lists.map(list => ({
    id: simplifyListId(list.id, LIST_ID_PREFIX),
    name: list.name,
  }));

  const normalizedItems = state.lists.flatMap(list =>
    list.items.map(item => ({
      listId: simplifyListId(list.id, LIST_ID_PREFIX),
      ...item,
      id: simplifyListId(item.id, ITEM_ID_PREFIX),
    }))
  );

  const normalized = [...normalizedLists, ...normalizedItems];

  // collect all headers
  const headers = Array.from(
    normalized.reduce((set, curr) => {
      Object.keys(curr).map(key => set.add(key));
      return set;
    }, new Set<string>())
  );

  // leave empty for undefined
  const values = normalized.map((x: any) =>
    headers.map(h => (x[h] === undefined ? '' : `${x[h]}`))
  );

  values.unshift(headers);

  const validKeys = new Set([
    'sortMode',
    'categoryMode',
    'categoryColorMapper',
  ]);

  const settings = Object.entries(state)
    // don't handle .lists as settings since we already serialized it
    .filter(([key, _value]) => validKeys.has(key))
    .map(([key, value]) => JSON.stringify({ key, value }));

  values.unshift(settings);

  return values;
}
