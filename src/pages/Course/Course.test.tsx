import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { Course } from "./Course";
import { useCourseQuery } from "./useCourseQuery";

const mockedUseCourseQuery = useCourseQuery as jest.Mock;
jest.mock("./useCourseQuery");

type Props = {
    children: ReactNode;
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: Props) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

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

const createComponent = () =>
    render(
        <MemoryRouter>
            <Course />
        </MemoryRouter>,
        { wrapper }
    );

describe("Course component", () => {
    test("Displays the loading view", () => {
        mockedUseCourseQuery.mockImplementation(() => ({
            isLoading: true,
        }));
        createComponent();
        expect(screen.getByTestId("course-loading")).toBeInTheDocument();
        expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    test("Displays the error message", () => {
        mockedUseCourseQuery.mockImplementation(() => ({
            isError: true,
        }));
        createComponent();
        expect(screen.getByTestId("course-error")).toBeInTheDocument();
        expect(screen.getByText(/Error!/i)).toBeVisible();
    });

    test("Should render Course", () => {
        mockedUseCourseQuery.mockImplementation(() => ({
            data: response,
        }));
        createComponent();
        expect(mockedUseCourseQuery).toBeCalledTimes(1);
        expect(screen.getByTestId("course-page")).toBeInTheDocument();
    });
});
