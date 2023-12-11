/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {
        colors:{
            "c-red":"#c0392b",
            "c-red2":"#e74c3c"
        }
    },
    },
    plugins: [],
}

