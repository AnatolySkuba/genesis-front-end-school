export type Course = {
    id: string;
    title: string;
    description: string;
    previewImageLink: string;
    lessonsCount: number;
    rating: number;
    meta: {
        skills: string[];
        courseVideoPreview: { link: string };
    };
};
