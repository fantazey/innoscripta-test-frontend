import { deepClone } from '../src/utils';

describe('deepClone', () => {
  it('should clone nested objects', () => {
    const a = {
        a1: 1, a2: 2, a3: null, a4: undefined, a5: Infinity
      },
      c = [1, 2, 3, 4, a],
      b = {
        b1: 'b1', b2: 'b2', b3: 3, b4: a, b5: c
      },
      res = deepClone(b);
    expect(res).not.toBe(b);
    expect(res).toEqual(b);

    expect(res.b4).not.toBe(a);
    expect(res.b4).toEqual(a);

    expect(res.b5).not.toBe(c);
    expect(res.b5[5]).not.toBe(a);
  });

  it('should clone arrays of arrays', () => {
    const a = [1, 2, 3, null, undefined],
      c = { c1: '1', c2: 2, c3: undefined },
      b = ['a', 'b', 'c', {}, '', a, [a], c],
      res = deepClone(b);
    expect(res).toEqual(b);
    expect(res).not.toBe(b);

    expect(res[5]).not.toBe(a);
    expect(res[5]).toEqual(a);

    expect(res[6][0]).not.toBe(a);

    expect(res[7]).not.toBe(c);
  });
});
