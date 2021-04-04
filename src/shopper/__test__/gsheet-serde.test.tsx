import {
  deserialize,
  serialize,
} from '../components/google-sheets/gsheets-serde';
import { ShopperState } from '../redux/state';

import sample from '../../../state.sample.json';

describe('serde function', () => {
  test('serializes and deserializes ShopperState', () => {
    const serialized = serialize(sample as ShopperState, false);
    const deserialized = deserialize(serialized);
    // selectedList is not expected
    const { selectedList, ...expected } = sample;
    expect(expected).toEqual(deserialized);
  });
});
