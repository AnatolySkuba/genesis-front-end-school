import axios from 'axios';

import { QUERY_KEYS } from 'shared/consts';
import { getCoursesList, getCourseById } from '.';

jest.mock('axios');

declare const global: any;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('getCoursesList', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return courses data on successful request', async () => {
    const courses = [{ title: 'Course 1' }, { title: 'Course 2' }];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: { courses } });

    const result = await getCoursesList('');

    expect(result).toEqual(courses);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}`),
      expect.anything()
    );
  });

  it('should throw an error on failed request', async () => {
    const error = new Error('Network error');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(error);

    await expect(getCoursesList('')).rejects.toThrow(
      'Oops, error in getting credentials. Network error'
    );
  });
});

describe('getCourseById', () => {
  const mockQueryKey = '1';
  const mockCourse = {
    id: '1',
    title: 'Test Course',
  };

  it('should fetch a course successfully2', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockCourse,
    });

    const result = await getCourseById(mockQueryKey);

    expect(result).toEqual(mockCourse);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}`),
      expect.any(Object)
    );
  });

  it('should throw an error if the API call fails', async () => {
    const error = new Error('Network error');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(error);

    await expect(getCourseById(mockQueryKey)).rejects.toThrow(
      'Oops, error in getting credentials. Network error'
    );
  });
});
