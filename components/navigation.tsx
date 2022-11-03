import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ArrowTopRightOnSquareIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { combineClasses } from '@richochet/utils/functions';
import { useTranslation } from 'next-i18next';
import { Fragment, useState } from 'react';

const userNavigation = [
	{ name: 'Your Activity', href: 'http://' },
	{ name: 'Disconnect Wallet', href: 'http://' },
];

export default function Navigation(): JSX.Element {
	const { t } = useTranslation('home');
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
				{navOpen ? (
					<XMarkIcon className='h-6 w-6' aria-hidden='true' />
				) : (
					<Bars3Icon className='h-6 w-6' aria-hidden='true' />
				)}
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
					<button type='button' className='address-link'>
						0x123...2838
					</button>
					<div className='mt-3 space-y-1 px-2'>
						{userNavigation.map((item) => (
							<Disclosure.Button
								key={item.name}
								as='a'
								href={item.href}
								className='block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-700 hover:text-slate-100'>
								{t(`${item.name.toLocaleLowerCase().replace(/\s/g, '')}`)}
							</Disclosure.Button>
						))}
					</div>
				</div>
			</Disclosure.Panel>

			{/* Desktop Menu */}
			<div className='desktop-links'>
				<a
					className='inline-flex items-center space-x-1 text-slate-400'
					href='http://'
					target='_blank'
					rel='noopener noreferrer'>
					<span className='underline'>{t('support')}</span>
					<ArrowTopRightOnSquareIcon className='h-4 w-4' />
				</a>
				<p>6893 RIC</p>
				<Menu as='div' className='relative ml-3'>
					<Menu.Button
						type='button'
						className='address-link'
						id='user-menu-button'
						aria-expanded='false'
						aria-haspopup='true'>
						<span className='sr-only'>Open user menu</span>
						0x123...2838
					</Menu.Button>
					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'>
						<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
							{userNavigation.map((item) => (
								<Menu.Item key={item.name}>
									{({ active }) => (
										<a
											href={item.href}
											className={combineClasses(
												active ? 'bg-slate-100' : '',
												'block px-4 py-2 text-sm text-slate-600'
											)}>
											{t(`${item.name.toLocaleLowerCase().replace(/\s/g, '')}`)}
										</a>
									)}
								</Menu.Item>
							))}
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</Disclosure>
	);
}
