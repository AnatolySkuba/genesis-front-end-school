import { useQuery } from "react-query";
import { getCourse } from "../../services/API";
import { ROUTER_KEYS } from "../../utils/constants";

export const useCourseQuery = (courseId: string) => {
    const { data, isLoading, isError } = useQuery(
        [`${ROUTER_KEYS.COURSES}`, { courseId }],
        getCourse
    );
    return { data, isLoading, isError };
};
