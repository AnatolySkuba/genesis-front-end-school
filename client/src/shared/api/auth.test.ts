import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { LocalStorageMock } from 'shared/lib/tests/helpers/mockLocalStorage';
import {
  API_VERSIONS, BASE_URL, QUERY_KEYS, STORAGE_KEYS,
} from 'shared/consts';

import { getConfig, getCredentials } from './auth';

declare const global: any;

describe('auth', () => {
  let mockAxios: MockAdapter;

  beforeAll(() => {
    global.localStorage = new LocalStorageMock();
  });

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
    localStorage.clear();
  });

  afterAll(() => {
    global.localStorage = undefined;
  });

  describe('getCredentials', () => {
    it('should set token in local storage when API call is successful', async () => {
      const token = 'test_token';
      mockAxios
        .onGet(
          `${BASE_URL}/${API_VERSIONS.V1}/${QUERY_KEYS.AUTH}/${QUERY_KEYS.ANONYMOUS}?platform=subscriptions`,
        )
        .reply(200, {
          token,
        });
      const localStorageSetItemSpy = jest.spyOn(localStorage, 'setItem');

      await getCredentials();

      expect(localStorageSetItemSpy).toHaveBeenCalledWith(STORAGE_KEYS.TOKEN, token);
    });

    it('should throw an error when API call fails', async () => {
      const errorMessage = 'Request failed with status code 500';
      mockAxios
        .onGet(
          `${BASE_URL}/${API_VERSIONS.V1}/${QUERY_KEYS.AUTH}/${QUERY_KEYS.ANONYMOUS}?platform=subscriptions`,
        )
        .reply(500);

      await expect(getCredentials()).rejects.toThrow(
        `Oops, error in getting credentials. ${errorMessage}`,
      );
    });
  });

  describe('getConfig', () => {
    jest.mock('./auth', () => ({
      getCredentials: jest.fn(),
    }));

    it('should return an object with Authorization header when token exists in local storage', async () => {
      const token = 'test_token';
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      const expectedConfig = { headers: { Authorization: `Bearer ${token}` } };

      const config = await getConfig();

      expect(config).toEqual(expectedConfig);
    });
  });
});
