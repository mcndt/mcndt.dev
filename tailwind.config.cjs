/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				header: ['"Darker Grotesque"', 'sans-serif'],
				body: ['Inter', 'sans-serif']
			},
			colors: {
				cream: {
					100: '#7C806F',
					200: '#949582',
					300: '#AAAA95',
					400: '#BFBCA8',
					500: '#D5CDBB',
					600: '#EADDCE',
					700: '#FfEDE1',
					800: '#FFF6EA',
					900: '#FFFDF7'
				},
				// cream: '#F5EDE1',
				coffee: '#1c1917' // stone-900
			},
			dropShadow: {
				['sharp']: '8px 6px 0px black',
				['sharp-hover']: '10px 10px 0px rgb(64,64,64)',
				['sharp-active']: '3px 2px 0px black',
				['sharp-dark']: '8px 6px 0px rgba(157,150,137,0.2)',
				['sharp-dark-hover']: '10px 10px 0px rgba(157,150,137,0.2)',
				['sharp-dark-active']: '3px 2px 0px rgba(157,150,137,0.2)'
				// ['sharp-down-dark']: 'drop-shadow(0px 8px 0px rgba(157, 150, 137, 0.15)'
				// ['sharp']: '10px 8px 0px rgba(0, 0, 0, 0.66)',
				// ['sharp-hover']: '12px 14px 0px rgba(0, 0, 0, 0.50)',
				// ['sharp-active']: '6px 4px 0px rgba(0, 0, 0, 0.8)'
				// ['sharp']: '10px 8px 0px rgba(132, 129, 113, 0.8)',
				// ['sharp-hover']: '12px 14px 0px rgba(132, 129, 113, 0.6)',
				// ['sharp-active']: '6px 4px 0px rgba(132, 129, 113, 0.9)'
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': '#1F1F1F',
						'--tw-prose-invert-body': theme('colors.cream[400]'),
						// links should be the same color as the text
						'--tw-prose-links': '#000000',
						'--tw-prose-invert-links': theme('colors.cream[700]'),
						// headings should be in in black for light mode, cream 700 for dark mode
						'--tw-prose-headings': '#000000',
						'--tw-prose-invert-headings': theme('colors.cream[700]'),
						// bold should be in black for light mode, cream 700 for dark mode
						'--tw-prose-bold': '#000000',
						'--tw-prose-invert-bold': theme('colors.cream[700]'),
						'font-size': '1em',
						'line-height': '1.8',
						a: {
							'font-weight': 'inherit',
							'text-decoration': 'none',
							'box-shadow': '0 1px'
						},
						code: {
							'font-family': 'monospace',
							'font-weight': '400',
							'font-size': '1.1em',
							'line-height': '1.5',
							'border-radius': '2px',
							margin: 'auto 4px',
							padding: '4px 6px'
						},
						pre: {
							code: {
								background: 'transparent !important'
							}
						}
					}
				}
			})
		}
	},
	plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')]
};
