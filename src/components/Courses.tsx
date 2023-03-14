import React from "react";
import { useQuery } from "react-query";
import Hls from "hls.js";

import { getAllCourses } from "../services/API";
import { CourseCard } from "./CourseCard";
import { ROUTER_KEYS } from "../utils/constants";

export const Courses = () => {
    const { data, isLoading } = useQuery(`${ROUTER_KEYS.COURSES}`, () => getAllCourses());
    // const [hls, setHls] = useState<Hls | null>(new Hls());
    const videoEl = document.getElementById("video") as HTMLVideoElement;

    if (Hls.isSupported() && videoEl) {
        const hls = new Hls();
        hls.loadSource("https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8");
        hls.attachMedia(videoEl!);
    }

    console.log(6, data, isLoading, data?.data.courses);

    return (
        <>
            <div className="hidden mobile:block">
                <p className="">mobile</p>
                <video id="video" controls />
            </div>
            {/* <div className="hidden tablet:block"> */}
            <div className="">
                {data?.data.courses.map((course: any) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
            <div className="hidden laptop:block">
                <p className="">laptop</p>
            </div>
            <div className="hidden desktop:block">
                <p className="">desktop</p>
            </div>
        </>
    );
};
