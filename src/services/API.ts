import axios from "axios";

import { URL, API_VERSIONS, QUERY_KEYS, STORAGE_KEYS } from "../utils/constants";

export const getCredentials = async () => {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.AUTH}/${QUERY_KEYS.ANONYMOUS}?platform=subscriptions`;
    const response = await axios.get(url);
    localStorage.setItem(STORAGE_KEYS.TOKEN, response.data?.token);
};

const getConfig = async () => {
    if (!localStorage.getItem(STORAGE_KEYS.TOKEN)) await getCredentials();
    return { headers: { Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` } };
};

export const getAllCourses = async () => {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}`;
    const response = await axios.get(url, await getConfig());

    return response;
};

export const getCourse = async (courseId: string) => {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}/${courseId}`;
    const response = await axios.get(url, await getConfig());

    return response;
};
