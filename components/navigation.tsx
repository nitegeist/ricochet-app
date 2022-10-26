import { combineClasses } from '@richochet/utils/functions';
import { useState } from 'react';
import { AddressButton } from './button';

export default function Navigation(): JSX.Element {
	const [navOpen, setNavOpen] = useState(false);
	const toggleNav = () => setNavOpen(!navOpen);
	return (
		<div className='navbar'>
			<a href='#' className='p-2 mr-4 inline-flex items-center'>
				<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className='fill-current h-8 w-8 mr-2'>
					<path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
				</svg>
				<span className='text-xl font-bold uppercase tracking-wide'>Tailwind CSS</span>
			</a>
			<button className='mobile-menu' type='button' onClick={toggleNav}>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
					<path
						fillRule='evenodd'
						d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
			{/* Mobile Menu */}
			<div
				className={combineClasses(
					navOpen
						? 'visible w-full lg:inline-flex lg:flex-grow lg:w-auto'
						: 'invisible w-full lg:inline-flex lg:flex-grow lg:w-auto'
				)}>
				<div className='mobile-links'>
					<a className='inline-flex items-center space-x-1' href='http://' target='_blank' rel='noopener noreferrer'>
						<span>support</span>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
							<path
								fillRule='evenodd'
								d='M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z'
								clipRule='evenodd'
							/>
							<path
								fillRule='evenodd'
								d='M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z'
								clipRule='evenodd'
							/>
						</svg>
					</a>
					<p>6893 RIC</p>
					<AddressButton address='0x123...2838' />
				</div>
			</div>

			{/* Desktop Menu */}
			<div className='desktop-links'>
				<a className='inline-flex items-center space-x-1' href='http://' target='_blank' rel='noopener noreferrer'>
					<span>support</span>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-4 h-4'>
						<path
							fillRule='evenodd'
							d='M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z'
							clipRule='evenodd'
						/>
						<path
							fillRule='evenodd'
							d='M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z'
							clipRule='evenodd'
						/>
					</svg>
				</a>
				<p>6893 RIC</p>
				<AddressButton address='0x123...2838' />
			</div>
		</div>
	);
}
