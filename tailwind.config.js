/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#b3daff',
					100: '#a9d0f6',
					200: '#9fc6ec',
					300: '#95bce2',
					400: '#8bb2d8',
					500: '#81a8ce',
					600: '#779ec4',
					700: '#6d94ba',
					800: '#638ab0',
					900: '#5980a6',
				},
				eth: '#B3FFFF',
				btc: '#FF8D8F',
				ric: '#7B7EFF',
			},
		},
	},
	plugins: [],
};
