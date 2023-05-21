import { useQuery } from "react-query";
import { getAllCourses } from "../../services/API";
import { ROUTER_KEYS } from "../../utils/constants";

export const useCourseListQuery = () => {
    const { data, isLoading, isError } = useQuery(`${ROUTER_KEYS.COURSES}`, getAllCourses);
    return { data, isLoading, isError };
};
