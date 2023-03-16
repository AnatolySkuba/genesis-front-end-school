import React, { useState } from "react";
import { useQuery } from "react-query";

import { getAllCourses } from "../services/API";
import { CourseCard } from "./CourseCard";
import { ROUTER_KEYS } from "../utils/constants";
import { Course } from "../utils/types";

export const Courses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useQuery(`${ROUTER_KEYS.COURSES}`, () => getAllCourses());
    if (isLoading) {
        return <p>Loading...</p>;
    }
    const pages = Math.ceil(data?.data.courses.length / 10);
    const courses = data?.data.courses.slice((currentPage - 1) * 10, currentPage * 10);

    return (
        <>
            <div className="grid gap-3 p-4 justify-items-center tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
                {courses?.map((course: Course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>

            {/* Pagination */}
            <nav
                aria-label="Pagination"
                className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0 caret-transparent"
            >
                <p
                    className="p-2 ml-4 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </p>
                <p
                    className={`w-10 h-10 text-center leading-10 rounded hover:bg-gray-100 cursor-pointer ${
                        currentPage === 1 && "bg-gray-200 text-gray-900 font-medium"
                    }`}
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </p>
                <p
                    className={`w-10 h-10 text-center leading-10 rounded hover:bg-gray-100 cursor-pointer ${
                        currentPage === 2 && "bg-gray-200 text-gray-900 font-medium"
                    }`}
                    onClick={() => setCurrentPage(2)}
                >
                    2
                </p>
                <p
                    className={`w-10 h-10 text-center leading-10 rounded hover:bg-gray-100 cursor-pointer ${
                        currentPage === 3 && "bg-gray-200 text-gray-900 font-medium"
                    }`}
                    onClick={() => setCurrentPage(3)}
                >
                    3
                </p>
                <p
                    className="p-2 ml-4 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                        setCurrentPage(pages > currentPage ? currentPage + 1 : currentPage)
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </p>
            </nav>
        </>
    );
};
