import { LocalStorageMock } from './mockLocalStorage';

describe('LocalStorageMock', () => {
  let localStorageMock: LocalStorageMock;

  beforeEach(() => {
    localStorageMock = new LocalStorageMock();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('setItem() and getItem() should work correctly', () => {
    const key = 'testKey';
    const value = 'testValue';

    localStorageMock.setItem(key, value);

    expect(localStorageMock.getItem(key)).toBe(value);
  });

  it('removeItem() should work correctly', () => {
    const key = 'testKey';
    const value = 'testValue';

    localStorageMock.setItem(key, value);
    localStorageMock.removeItem(key);

    expect(localStorageMock.getItem(key)).toBeNull();
  });

  it('clear() should clear all items', () => {
    const key1 = 'testKey1';
    const value1 = 'testValue1';
    const key2 = 'testKey2';
    const value2 = 'testValue2';

    localStorageMock.setItem(key1, value1);
    localStorageMock.setItem(key2, value2);
    localStorageMock.clear();

    expect(localStorageMock.getItem(key1)).toBeNull();
    expect(localStorageMock.getItem(key2)).toBeNull();
  });
});
