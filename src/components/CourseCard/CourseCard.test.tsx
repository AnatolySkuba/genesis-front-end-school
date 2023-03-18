import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CourseCard } from "./CourseCard";
import { mockLocalStorage } from "../../tests/helpers/mockLocalStorage";

const { getItemMock } = mockLocalStorage();

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

    test("Should render CourseCard", () => {
        createComponent();
        expect(screen.getByTestId("course-card")).toBeInTheDocument();
    });

    test("Navigate to Course component", () => {
        createComponent();
        fireEvent.click(screen.getByTestId("course-card"));
        // expect(screen.getByTestId("course-page")).toBeInTheDocument();
        // screen.debug();
    });

    test("The video player", () => {
        createComponent();
        expect(screen.getByTestId("video-player")).toBeInTheDocument();
        const savedTime = true;
        fireEvent.mouseOver(screen.getByTestId("video-player"));
        expect(getItemMock).toBeCalled();
    });
});
