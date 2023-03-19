import React from "react";
import { useSearchParams } from "react-router-dom";

import { CourseCard } from "../../components";
import { Course } from "../../utils/types";
import { useCourseListQuery } from "./useCourseListQuery";

export const CourseList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading, isError } = useCourseListQuery();

    const page = Number(searchParams.get("page")) || 1;

    if (isLoading) {
        return <div data-testid="courses-loading">Loading...</div>;
    }

    if (isError) {
        return <div data-testid="courses-error">Error!</div>;
    }

    const pages = Math.ceil(data?.data.courses.length / 10);
    const courses = data?.data.courses.slice((page - 1) * 10, page * 10);

    return (
        <>
            <ul
                className="grid gap-5 p-4 justify-items-center tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4"
                role="listbox"
            >
                {courses?.map((course: Course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </ul>

            {/* Pagination */}
            <nav
                aria-label="Pagination"
                className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0 caret-transparent"
            >
                <p
                    className="p-2 ml-4 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                        setSearchParams({
                            page: (page > 1 ? page - 1 : page).toString(),
                        })
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
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </p>
                <p
                    className={`w-10 h-10 text-center leading-10 rounded hover:bg-gray-100 cursor-pointer ${
                        page === 1 && "bg-gray-200 text-gray-900 font-medium"
                    }`}
                    onClick={() => setSearchParams({ page: "1" })}
                >
                    1
                </p>
                <p
                    className={`w-10 h-10 text-center leading-10 rounded hover:bg-gray-100 cursor-pointer ${
                        page === 2 && "bg-gray-200 text-gray-900 font-medium"
                    }`}
                    onClick={() => setSearchParams({ page: "2" })}
                >
                    2
                </p>
                <p
                    className={`w-10 h-10 text-center leading-10 rounded hover:bg-gray-100 cursor-pointer ${
                        page === 3 && "bg-gray-200 text-gray-900 font-medium"
                    }`}
                    onClick={() => setSearchParams({ page: "3" })}
                >
                    3
                </p>
                <p
                    className="p-2 ml-4 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                        setSearchParams({
                            page: (pages > page ? page + 1 : page).toString(),
                        })
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
