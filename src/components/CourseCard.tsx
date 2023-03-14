import React, { useEffect } from "react";
import Hls from "hls.js";
import { FcAcceptDatabase, FcPositiveDynamic, FcVoicePresentation } from "react-icons/fc";

import { Course } from "../utils/types";
import { Wrapper } from "./CourseCard.styles";
import { STORAGE_KEYS } from "../utils/constants";

export const CourseCard = ({
    id,
    title,
    description,
    previewImageLink,
    lessonsCount,
    rating,
    meta,
}: Course): JSX.Element => {
    // console.log(4, course);

    useEffect(() => {
        const video = document.getElementById(id) as HTMLVideoElement;
        console.log(20, video);
        if (
            Hls.isSupported() &&
            meta.courseVideoPreview?.link &&
            localStorage.getItem(STORAGE_KEYS.TOKEN)
        ) {
            const hls = new Hls({
                xhrSetup: (xhr) => {
                    xhr.setRequestHeader(
                        "Authorization",
                        `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`
                    );
                },
            });
            hls.loadSource(meta.courseVideoPreview?.link);
            hls.attachMedia(video);
        }
    }, [id, meta.courseVideoPreview?.link]);

    const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
        e.currentTarget.play();
    };

    const handleOnMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
        e.currentTarget.pause();
    };

    return (
        <>
            <video id={id} controls />
            <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                {/* <Wrapper>
                <div className="border" />
                <img
                    alt="Home"
                    src={`${previewImageLink}/cover.webp`}
                    className="mx-auto h-32 rounded-md object-cover"
                /> */}
                {/* <video ref={videoEl} controls /> */}

                {/* </Wrapper> */}
                <div className="mt-2">
                    <dl>
                        <div>
                            <dt className="sr-only">Title</dt>
                            <dd className="font-medium">{title}</dd>
                        </div>
                        <div>
                            <dt className="sr-only">Description</dt>
                            <dd className="text-sm text-gray-500">{description}</dd>
                        </div>
                    </dl>

                    <div className="mt-6 flex items-center gap-8 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <FcAcceptDatabase size="16" />
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Lessons count</p>
                                <p className="font-medium">{lessonsCount}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <FcPositiveDynamic size="16" />
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Rating</p>
                                <p className="font-medium">{rating}</p>
                            </div>
                        </div>

                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <FcVoicePresentation size="16" />
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Skills</p>
                                {meta.skills?.map((skill, index) => (
                                    <p key={index} className="font-medium">
                                        {skill}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </>
    );
};
