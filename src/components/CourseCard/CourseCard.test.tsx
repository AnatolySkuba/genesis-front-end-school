import { render, screen } from "@testing-library/react";
import { CourseCard } from "./CourseCard";

describe("CourseCard component", () => {
    const createComponent = () =>
        render(
            <CourseCard
                id={""}
                title={""}
                description={""}
                previewImageLink={""}
                lessonsCount={0}
                rating={0}
                meta={{
                    skills: [],
                    courseVideoPreview: {
                        link: "",
                    },
                }}
            />
        );

    beforeEach(createComponent);

    test("Render CourseCard correctly", () => {
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.getByRole("listitem")).toBeInTheDocument();
        expect(screen.getByRole("link")).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(screen.getByTestId("video-player")).toBeInTheDocument();
        expect(screen.getByText("Lessons")).toBeInTheDocument();
        expect(screen.getByText("Rating")).toBeInTheDocument();
        expect(screen.getByText("Skills")).toBeInTheDocument();
    });

    test("List snapshot", () => {
        expect(screen.getByRole("listitem")).toMatchSnapshot();
    });
});
