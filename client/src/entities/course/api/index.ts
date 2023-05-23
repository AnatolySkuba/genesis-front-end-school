import axios from 'axios';

import { QUERY_KEYS, API_VERSIONS, BASE_URL, MY_BASE_URL } from 'shared/consts';
import { getConfig } from 'shared/api/auth';

import { ICourse, ICourses } from '../model';

export const getCoursesList = async (query: string) => {
  const baseUrl = localStorage.getItem('color-theme') === 'dark' ? MY_BASE_URL : BASE_URL;
  const url = `${baseUrl}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}${query}`;
  try {
    const response = await axios.get<ICourses>(url, await getConfig());

    return response.data.courses;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getCourseById = async (id: string): Promise<ICourse | undefined> => {
  const url = `${BASE_URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}/${id}`;
  try {
    const response = await axios.get<ICourse>(url, await getConfig());

    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
