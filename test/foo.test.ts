import { sum } from '../app/foo';

describe('tutorial tests', () => {

  test('basic', () => {
    expect(sum()).toBe(0);
  });

  test('basic again', () => {
    expect(sum(1, 2)).toBe(3);
  });

});
