import axios from 'axios';

import { API_VERSIONS, BACKUP_TOKEN, BASE_URL, QUERY_KEYS, STORAGE_KEYS } from 'shared/consts';
import { Token } from 'shared/types';

export const getCredentials = async () => {
  const url = `${BASE_URL}/${API_VERSIONS.V1}/${QUERY_KEYS.AUTH}/${QUERY_KEYS.ANONYMOUS}?platform=subscriptions`;
  try {
    const response = await axios.get<Token>(url);
    console.log(10, response.data);

    localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
  } catch (error) {
    if (error instanceof Error) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, BACKUP_TOKEN);
      throw new Error(`Oops, error in getting credentials. ${error.message}`);
    }
  }
};

export const getConfig = async () => {
  if (!localStorage.getItem(STORAGE_KEYS.TOKEN)) await getCredentials();

  return { headers: { Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` } };
};
