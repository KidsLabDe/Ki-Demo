/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    purple: '#46178f',
                    blue: '#1368ce',
                    lightBlue: '#86d1fd',
                    pink: '#e21b5a',
                },
                quiz: {
                    red: '#e21b3c',
                    blue: '#1368ce',
                    yellow: '#d89e00',
                    green: '#26890c',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            }
        },
    },
    plugins: [],
}
