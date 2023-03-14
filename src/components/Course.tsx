import React from "react";
import { useQuery } from "react-query";

import { getAllCourses } from "../services/API";
import { ROUTER_KEYS } from "../utils/constants";

export const Course = () => {
    const { data, isLoading } = useQuery(`${ROUTER_KEYS.COURSES}`, () => getAllCourses());

    console.log(6, data, isLoading, data?.data.courses);

    return <p>2222</p>;
};
