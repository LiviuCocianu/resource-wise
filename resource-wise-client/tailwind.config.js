/** @type {import('tailwindcss').Config} */

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx}",
	],
	theme: {
		fontFamily: {
			"outfit": ["Outfit"]
		},
		extend: {
			colors: {
				"bgprimary": "#e0881b",
				"bgbutton": "#ffcc80",
				"bgbanner": "#ffb514"
			}
		},
	},
	plugins: [],
}
