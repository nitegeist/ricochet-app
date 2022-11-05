import { SVGProps } from 'react';

export const RicochetLogo = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox='0 0 66 33' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			d='M50.051 0H18.663c0-.056 7.805 6.052 7.805 6.052L0 15.949l26.75 10.123-7.747 6.278 31.048-.452C58.874 31.898 66 24.772 66 15.949S57.234-.056 50.051 0Zm0 28.391c-6.9 0-12.442-5.599-12.442-12.442s5.6-12.442 12.442-12.442c6.844 0 12.443 5.599 12.443 12.442s-5.6 12.442-12.443 12.442Z'
			fill='url(#a)'
		/>
		<path
			d='M47.45 23.81h-2.885v-8.822s2.885.17 2.885 1.866v6.956ZM44.735 6.391h7.013c1.98 0 5.599.679 5.599 5.43 0 4.75-4.638 5.033-4.638 5.033l4.412 6.956h-2.885l-3.789-5.995v-2.828s4.185.623 4.185-3.28c0-3.902-2.884-2.884-2.884-2.884l-5.43-.17s-1.47-.396-1.47-2.205l-.113-.057Z'
			fill='#C5C2C6'
		/>
		<defs>
			<linearGradient id='a' x1={0} y1={16.175} x2={66} y2={16.175} gradientUnits='userSpaceOnUse'>
				<stop stopColor='#6194C3' />
				<stop offset={1} stopColor='#B5CBE2' />
			</linearGradient>
		</defs>
	</svg>
);
