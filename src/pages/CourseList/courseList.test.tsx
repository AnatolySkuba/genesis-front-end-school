import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { CourseList } from "./CourseList";
import { useCourseListQuery } from "./useCourseListQuery";

const mockedUseCourseListQuery = useCourseListQuery as jest.Mock;
jest.mock("./useCourseListQuery");

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

const createComponent = () =>
    render(
        <MemoryRouter>
            <CourseList />
        </MemoryRouter>,
        { wrapper }
    );

describe("CourseList component", () => {
    test("Displays the loading view", () => {
        mockedUseCourseListQuery.mockImplementation(() => ({
            isLoading: true,
        }));
        createComponent();
        expect(screen.getByTestId("courses-loading")).toBeInTheDocument();
        expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    test("Displays the error message", () => {
        mockedUseCourseListQuery.mockImplementation(() => ({
            isError: true,
        }));
        createComponent();
        expect(screen.getByTestId("courses-error")).toBeInTheDocument();
        expect(screen.getByText(/Error!/i)).toBeVisible();
    });

    test("Should render CourseList", () => {
        mockedUseCourseListQuery.mockImplementation(() => ({
            data: response,
        }));
        createComponent();
        expect(mockedUseCourseListQuery).toBeCalledTimes(1);
        expect(screen.getByTestId("courses-wrapper")).toBeInTheDocument();
    });
});
