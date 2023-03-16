import axios from "axios";
import { toast } from "react-toastify";

import { URL, API_VERSIONS, QUERY_KEYS, STORAGE_KEYS } from "../utils/constants";

export const getCredentials = async () => {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.AUTH}/${QUERY_KEYS.ANONYMOUS}?platform=subscriptions`;
    try {
        const response = await axios.get(url);
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data?.token);
    } catch (error) {
        if (error instanceof Error)
            toast.error(`Oops, error in getting credentials. ${error.message}`);
    }
};

const getConfig = async () => {
    if (!localStorage.getItem(STORAGE_KEYS.TOKEN)) await getCredentials();
    return { headers: { Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` } };
};

export const getAllCourses = async () => {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}`;
    try {
        const response = await axios.get(url, await getConfig());
        return response;
    } catch (error) {
        if (error instanceof Error) toast.error(`Oops. ${error.message}`);
    }
};

export const getCourse = async (courseId: string) => {
    const url = `${URL}/${API_VERSIONS.V1}/${QUERY_KEYS.CORE}/${QUERY_KEYS.PREVIEW_COURSES}/${courseId}`;
    try {
        const response = await axios.get(url, await getConfig());
        return response;
    } catch (error) {
        if (error instanceof Error) toast.error(`Oops. ${error.message}`);
    }
};
