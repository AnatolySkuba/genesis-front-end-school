import { screen } from "@testing-library/react";

import { CourseList } from "./CourseList";
import { useCourseListQuery } from "./useCourseListQuery";
import { renderWithRouter } from "../../tests/helpers/renderWithRouter";

const mockedUseCourseListQuery = useCourseListQuery as jest.Mock;
jest.mock("./useCourseListQuery");

const response = {
    data: {
        courses: [
            {
                containsLockedLessons: true,
                description:
                    "Reignite your inner drive by managing factors that dampen your motivation.",
                duration: 521,
                id: "352be3c6-848b-4c19-9e7d-54fe68fef183",
                launchDate: "2023-03-06T16:50:06.000Z",
                lessonsCount: 2,
                meta: {
                    slug: "lack-of-motivation-how-to-overcome-it",
                    skills: [
                        "Aligning your goals with your motives",
                        "Overcoming decision paralysis",
                        "Reframing negative self-talk",
                        "Gaining clarity",
                        "Challenging yourself",
                    ],
                    courseVideoPreview: {
                        link: "https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8",
                        duration: 27,
                        previewImageLink:
                            "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it/preview",
                    },
                },
                previewImageLink:
                    "https://wisey.app/assets/images/web/course-covers/lack-of-motivation-how-to-overcome-it",
                rating: 3.5,
                status: "launched",
                tags: ["productivity"],
                title: "Lack of Motivation & How to Overcome It",
            },
        ],
    },
};

describe("CourseList component", () => {
    afterEach(jest.clearAllMocks);

    test("Displays the loading view", () => {
        mockedUseCourseListQuery.mockImplementation(() => ({
            isLoading: true,
        }));
        renderWithRouter(<CourseList />);
        expect(screen.getByTestId("courses-loading")).toBeInTheDocument();
        expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    test("Displays the error message", () => {
        mockedUseCourseListQuery.mockImplementation(() => ({
            isError: true,
        }));
        renderWithRouter(<CourseList />);
        expect(screen.getByTestId("courses-error")).toBeInTheDocument();
        expect(screen.getByText(/Error!/i)).toBeVisible();
    });

    test("Render CourseList correctly", () => {
        mockedUseCourseListQuery.mockImplementation(() => ({
            data: response,
        }));
        renderWithRouter(<CourseList />);
        expect(screen.getByRole("listbox")).toBeInTheDocument();
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    test("Queries are called", () => {
        mockedUseCourseListQuery.mockImplementation(() => ({
            data: response,
        }));
        renderWithRouter(<CourseList />);
        expect(mockedUseCourseListQuery).toBeCalledTimes(1);
    });

    test("CourseList snapshots", () => {
        mockedUseCourseListQuery.mockImplementation(() => ({
            data: response,
        }));
        renderWithRouter(<CourseList />);
        expect(screen.getByRole("listbox")).toMatchSnapshot();
        expect(screen.getByRole("navigation")).toMatchSnapshot();
    });
});
