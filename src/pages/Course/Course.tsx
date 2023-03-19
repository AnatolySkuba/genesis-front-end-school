import React, { useEffect, useState } from "react";
import {
    FcAcceptDatabase,
    FcPositiveDynamic,
    FcStart,
    FcUndo,
    FcVoicePresentation,
} from "react-icons/fc";
import { SlLock } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Hls from "hls.js";

import { STORAGE_KEYS } from "../../utils/constants";
import { Lesson } from "../../utils/types";
import { useCourseQuery } from "./useCourseQuery";

export const Course = (): JSX.Element => {
    const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
    const [isPip, setIsPip] = useState("");
    const navigate = useNavigate();
    const { courseId } = useParams<{ courseId: string }>();
    const { data, isLoading, isError } = useCourseQuery(courseId!);

    useEffect(() => {
        if (courseId) {
            const video = document.getElementById(courseId) as HTMLVideoElement;
            !videoEl && setVideoEl(video);
        }
    }, [courseId, videoEl, isLoading]);

    if (isLoading) {
        return <p data-testid="course-loading">Loading...</p>;
    }

    if (isError) {
        return <div data-testid="course-error">Error!</div>;
    }

    const { id, title, description, lessons, rating, meta } = data?.data;

    if (
        videoEl &&
        Hls.isSupported() &&
        meta.courseVideoPreview?.link &&
        localStorage.getItem(STORAGE_KEYS.TOKEN)
    ) {
        const savedTime = localStorage.getItem(`currentCourseTime ${id}`);
        const hls = new Hls({
            xhrSetup: (xhr) => {
                xhr.responseType = "json";
                xhr.setRequestHeader(
                    "Authorization",
                    `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`
                );
            },
        });
        hls.loadSource(meta.courseVideoPreview?.link);
        // hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
        hls.attachMedia(videoEl);

        savedTime && hls.startLoad(Number(savedTime));
        setTimeout(function () {
            if (savedTime) videoEl.currentTime = Number(savedTime);
            videoEl.play();
        }, 150);
        videoEl.onpause = () => {
            localStorage.setItem(`currentCourseTime ${id}`, videoEl?.currentTime.toString());
        };
    }

    const pip = async (id: string) => {
        const video = document.getElementById(id) as HTMLVideoElement;

        const eventListenerKeydown = (event: KeyboardEvent) => {
            if (event.ctrlKey) {
                event.code === "Comma" &&
                    (video.playbackRate =
                        video.playbackRate >= 0.5 ? video.playbackRate - 0.25 : 0.25);
                event.code === "Period" &&
                    (video.playbackRate =
                        video.playbackRate <= 3.75 ? video.playbackRate + 0.25 : 4);
            }
        };
        window.addEventListener("keydown", eventListenerKeydown, false);

        if (
            Hls.isSupported() &&
            meta.courseVideoPreview?.link &&
            localStorage.getItem(STORAGE_KEYS.TOKEN)
        ) {
            const savedTime = localStorage.getItem(`currentLessonTime ${id}`);
            const hls = new Hls({
                xhrSetup: (xhr) => {
                    xhr.responseType = "json";
                    xhr.setRequestHeader(
                        "Authorization",
                        `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`
                    );
                },
            });
            hls.loadSource(meta.courseVideoPreview?.link);
            // hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
            hls.attachMedia(video);
            savedTime && hls.startLoad(Number(savedTime));
            setTimeout(function () {
                if (savedTime) video.currentTime = Number(savedTime);
                video.play();
            }, 150);
            video.onpause = () => {
                localStorage.setItem(`currentLessonTime ${id}`, video?.currentTime.toString());
            };
        }

        video.addEventListener("enterpictureinpicture", () => {
            setIsPip(id);
        });
        video.addEventListener("leavepictureinpicture", () => {
            window.removeEventListener("keydown", eventListenerKeydown, false);
            setIsPip("");
            localStorage.setItem(`currentLessonTime ${id}`, video?.currentTime.toString());
        });

        video.onloadedmetadata = async () => {
            try {
                if (document.pictureInPictureElement) {
                    localStorage.setItem(`currentLessonTime ${id}`, video?.currentTime.toString());
                    await document.exitPictureInPicture();
                }
                video?.requestPictureInPicture();
            } catch (err) {
                toast.error("Video failed to enter/leave Picture-in-Picture mode.");
                console.log("Video failed to enter/leave Picture-in-Picture mode.", err);
            }
        };
    };

    return (
        <div className="p-3" data-testid="course-page">
            <FcUndo className="cursor-pointer" onClick={() => navigate(-1)} role="link" />
            <div className="max-w-160 mx-auto">
                <video
                    id={id}
                    className="border h-full w-full rounded-md object-cover"
                    loop
                    muted
                    controls
                    data-testid="video-player"
                />
            </div>
            <div className="mt-1">
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>

                <div className="flex items-center justify-around text-xs">
                    <div className="mt-1.5">
                        <p className="text-gray-500">Rating</p>
                        <p className="flex font-medium gap-1">
                            <FcPositiveDynamic size="16" />
                            {rating}
                        </p>
                    </div>

                    <div className="mt-1.5">
                        <div className="flex gap-2">
                            <p className="text-gray-500">Skills</p>
                            <FcVoicePresentation size="16" />
                        </div>
                        <ul>
                            {meta.skills ? (
                                meta.skills?.map((skill: string, index: number) => (
                                    <li key={index}>
                                        <p className="w-50 font-medium">{skill}</p>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p>?</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-2">
                    <div className="flex gap-2 items-center">
                        <p className="font-medium">Lessons</p>
                        <FcAcceptDatabase size="16" />
                    </div>

                    <ul>
                        {lessons?.map((lesson: Lesson) => (
                            <li key={lesson.id} className="flex items-center gap-3">
                                <video className="hidden" id={lesson.id} loop muted></video>
                                <p
                                    className="cursor-pointer text-blue-800 hover:scale-105 hover:ml-2"
                                    onClick={() =>
                                        lesson.status === "locked"
                                            ? toast.error("Oops, the lesson is locked!")
                                            : pip(lesson.id)
                                    }
                                    role="button"
                                >
                                    {lesson.title}
                                </p>
                                {lesson.status === "locked" && <SlLock size="10" color="red" />}
                                {lesson.id === isPip && (
                                    <>
                                        <FcStart className="animate-pulse" />
                                        <p>
                                            Press Ctrl + &#62; to increase speed, press Ctrl + &lt;
                                            to slow down playback
                                        </p>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
