import { screen } from "@testing-library/react";

import { Course } from "./Course";
import { useCourseQuery } from "./useCourseQuery";
import { renderWithRouter } from "../../tests/helpers/renderWithRouter";

const mockedUseCourseQuery = useCourseQuery as jest.Mock;
jest.mock("./useCourseQuery");

const response = {
    data: {
        containsLockedLessons: true,
        description: "Find the inner strength to overcome procrastination and reach your goals.",
        duration: 509,
        id: "3b77ceb6-fb43-4cf5-a25b-8fe9222a0714",
        launchDate: "2023-03-06T16:25:24.000Z",
        lessons: [
            {
                duration: 229,
                id: "b9ad7391-0f0b-4fe1-b919-6525d76ad3c4",
                link: "https://wisey.app/videos/the-power-of-self-discipline-how-to-stay-on-track/lesson-1/AppleHLS1/lesson-1.m3u8",
                meta: null,
                order: 1,
                previewImageLink:
                    "https://wisey.app/assets/images/web/lessons-covers/the-power-of-self-discipline-how-to-stay-on-track/lesson-1",
                status: "unlocked",
                title: "Why short-term gains aren’t worth it",
                type: "video",
            },
        ],
        meta: {
            slug: "the-power-of-self-discipline-how-to-stay-on-track",
            skills: ["Increasing self-awareness"],
            courseVideoPreview: {
                link: "https://wisey.app/videos/the-power-of-self-discipl…w-to-stay-on-track/preview/AppleHLS1/preview.m3u8",
                duration: 19,
                previewImageLink:
                    "https://wisey.app/assets/images/web/course-covers/the-power-of-self-discipline-how-to-stay-on-track/preview",
            },
        },
        previewImageLink:
            "https://wisey.app/assets/images/web/course-covers/the-power-of-self-discipline-how-to-stay-on-track",
        rating: 3.5,
        status: "launched",
        tags: ["productivity"],
        title: "The Power of Self-Discipline: How to Stay on Track",
    },
};

describe("Course component", () => {
    afterEach(jest.clearAllMocks);

    test("Displays the loading view", () => {
        mockedUseCourseQuery.mockImplementation(() => ({
            isLoading: true,
        }));
        renderWithRouter(<Course />);
        expect(screen.getByTestId("course-loading")).toBeInTheDocument();
        expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    test("Displays the error message", () => {
        mockedUseCourseQuery.mockImplementation(() => ({
            isError: true,
        }));
        renderWithRouter(<Course />);
        expect(screen.getByTestId("course-error")).toBeInTheDocument();
        expect(screen.getByText(/Error!/i)).toBeVisible();
    });

    test("Render Course correctly", () => {
        mockedUseCourseQuery.mockImplementation(() => ({
            data: response,
        }));
        renderWithRouter(<Course />);
        expect(mockedUseCourseQuery).toBeCalledTimes(1);
        expect(screen.getByTestId("course-page")).toBeInTheDocument();
        expect(screen.getByTestId("video-player")).toBeInTheDocument();
        expect(screen.getByText("Lessons")).toBeInTheDocument();
        expect(screen.getByText("Rating")).toBeInTheDocument();
        expect(screen.getByText("Skills")).toBeInTheDocument();
    });

    test("The video tag should have loop and controls attributes", () => {
        mockedUseCourseQuery.mockImplementation(() => ({
            data: response,
        }));
        renderWithRouter(<Course />);
        expect(screen.getByTestId("video-player")).toHaveAttribute("loop");
        expect(screen.getByTestId("video-player")).toHaveAttribute("controls");
    });

    test("Course snapshot", () => {
        mockedUseCourseQuery.mockImplementation(() => ({
            data: response,
        }));
        renderWithRouter(<Course />);
        expect(screen.getByTestId("course-page")).toMatchSnapshot();
    });
});
