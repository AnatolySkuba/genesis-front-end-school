/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                mobile: { max: "684px" },
                tablet: { min: "684px", max: "1016px" },
                laptop: { min: "1016px", max: "1348px" },
                desktop: "1348px",
            },
            width: {
                50: "12.5rem",
            },
        },
        minWidth: {
            80: "320px",
        },
        maxWidth: {
            160: "640px",
        },
    },
    plugins: [],
};
