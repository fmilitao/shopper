import Ajv from 'ajv';

import type { ShopperState } from './state';
import { ShopperStateSchema as schema } from './state';

const key = 'shopper-state';

export function validate(obj: unknown): ShopperState {
  const ajv = new Ajv({ allErrors: true });
  const test = ajv.compile(schema);
  if (test(obj)) {
    return obj as ShopperState;
  }
  console.error(`Existing state object:
${JSON.stringify(obj, null, 2)}
Failed validation:
${JSON.stringify(test.errors, null, 2)}`);

  throw Error('Invalid object');
}

export function load(defaultValue: ShopperState): ShopperState {
  const raw = localStorage.getItem(key);
  if (raw === null) {
    return defaultValue;
  }
  const object = JSON.parse(raw);
  return validate(object);
}

export function save(state: ShopperState) {
  const shallowClone = {
    ...state,
    // ensure not saved
    dialogState: undefined,
    listUndo: undefined,
    itemUndo: undefined,
  };
  localStorage.setItem(key, JSON.stringify(shallowClone));
}
