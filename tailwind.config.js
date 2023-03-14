/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                mobile: { max: "640px" },
                tablet: { min: "640px", max: "1024px" },
                laptop: { min: "1024px", max: "1280px" },
                desktop: "1280px",
            },
        },
    },
    plugins: [],
};
