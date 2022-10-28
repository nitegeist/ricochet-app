import { Disclosure } from '@headlessui/react';
import { ArrowTopRightOnSquareIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { combineClasses } from '@richochet/utils/functions';
import { useState } from 'react';

export default function Navigation(): JSX.Element {
	const [navOpen, setNavOpen] = useState(false);
	const toggleNav = () => setNavOpen(!navOpen);
	return (
		<Disclosure as='nav' className='navbar'>
			<a href='#' className='p-2 mr-4 inline-flex items-center'>
				<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className='fill-current h-8 w-8 mr-2'>
					<path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
				</svg>
				<span className='text-xl font-bold uppercase tracking-wide'>Tailwind CSS</span>
			</a>
			<Disclosure.Button className='btn-mobile-menu' onClick={toggleNav}>
				<span className='sr-only'>Open main menu</span>
				{navOpen ? <XMarkIcon className='h-6 w-6' /> : <Bars3Icon className='h-6 w-6' />}
			</Disclosure.Button>
			{/* Mobile Menu */}
			<Disclosure.Panel
				className={combineClasses(
					navOpen
						? 'visible w-full lg:inline-flex lg:flex-grow lg:w-auto'
						: 'invisible w-full lg:inline-flex lg:flex-grow lg:w-auto'
				)}>
				<div className='mobile-links'>
					<a
						className='inline-flex items-center space-x-1 text-slate-400'
						href='http://'
						target='_blank'
						rel='noopener noreferrer'>
						<span className='underline'>support</span>
						<ArrowTopRightOnSquareIcon className='h-4 w-4' />
					</a>
					<p>6893 RIC</p>
					<a href='#' className='address-link'>
						0x123...2838
					</a>
				</div>
			</Disclosure.Panel>

			{/* Desktop Menu */}
			<div className='desktop-links'>
				<a
					className='inline-flex items-center space-x-1 text-slate-400'
					href='http://'
					target='_blank'
					rel='noopener noreferrer'>
					<span className='underline'>support</span>
					<ArrowTopRightOnSquareIcon className='h-4 w-4' />
				</a>
				<p>6893 RIC</p>
				<a href='#' className='address-link'>
					0x123...2838
				</a>
			</div>
		</Disclosure>
	);
}
