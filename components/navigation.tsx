import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ArrowTopRightOnSquareIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { combineClasses } from '@richochet/utils/functions';
import { tokens } from '@richochet/utils/tokens';
import { ConnectKitButton } from 'connectkit';
import { Token } from 'enumerations/token.enum';
import RicochetLogo from 'icons/richochet-logo';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Fragment } from 'react';
import { chain, useAccount, useBalance, useDisconnect } from 'wagmi';
import { RoundedButton } from './button';

export default function Navigation(): JSX.Element {
	const { disconnect } = useDisconnect();
	const { address, isConnected } = useAccount();
	const { data, isError, isLoading } = useBalance({
		addressOrName: address,
		chainId: chain.polygon.id,
		token: tokens[Token.RIC],
	});
	const { t } = useTranslation('home');
	return (
		<Disclosure as='nav' className='navbar'>
			{({ open }) => (
				<>
					<Link href='/' className='p-2 mr-4 inline-flex items-center space-x-2' draggable={false}>
						<RicochetLogo width='50' height='25' />
						<span className='text-xl tracking-wide'>Ricochet</span>
					</Link>
					<Disclosure.Button className='btn-mobile-menu'>
						<span className='sr-only'>Open main menu</span>
						{open ? (
							<XMarkIcon className='h-6 w-6' aria-hidden='true' />
						) : (
							<Bars3Icon className='h-6 w-6' aria-hidden='true' />
						)}
					</Disclosure.Button>
					{/* Mobile Menu */}
					<Disclosure.Panel className='w-full lg:inline-flex lg:flex-grow lg:w-auto'>
						<div className='mobile-links'>
							<a
								className='inline-flex items-center space-x-1 text-primary-500'
								href='https://discord.com/channels/862796510604296263/864667072357597185'
								target='_blank'
								rel='noopener noreferrer'>
								<span className='underline'>support</span>
								<ArrowTopRightOnSquareIcon className='h-4 w-4' />
							</a>
							{isLoading && <p>Fetching balance...</p>}
							{isError && <></>}
							{!isLoading && !isError && isConnected && (
								<p>
									{data?.formatted} {data?.symbol}
								</p>
							)}
							<ConnectKitButton.Custom>
								{({ isConnected, show, unsupported, truncatedAddress, ensName }) => {
									return (
										<>
											{(() => {
												if (!isConnected) {
													return (
														<RoundedButton
															action={`${t('connect-wallet')}`}
															handleClick={show}
															type='button'></RoundedButton>
													);
												}

												if (unsupported) {
													return (
														<RoundedButton
															action={`${t('wrong-network')}`}
															handleClick={show}
															type='button'></RoundedButton>
													);
												}

												return (
													<button type='button' className='address-link'>
														{ensName ?? truncatedAddress}
													</button>
												);
											})()}
										</>
									);
								}}
							</ConnectKitButton.Custom>
							{isConnected && (
								<div className='mt-3 space-y-1 px-2'>
									<Disclosure.Button
										as='a'
										className='block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-700 hover:text-slate-100 cursor-pointer'>
										{t(`your-activity`)}
									</Disclosure.Button>
									<Disclosure.Button
										as='a'
										onClick={() => disconnect()}
										className='block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-700 hover:text-slate-100 cursor-pointer'>
										{t(`disconnect-wallet`)}
									</Disclosure.Button>
								</div>
							)}
						</div>
					</Disclosure.Panel>

					{/* Desktop Menu */}
					<div className='desktop-links'>
						<a
							className='inline-flex items-center space-x-1 text-primary-500'
							href='https://discord.com/channels/862796510604296263/864667072357597185'
							target='_blank'
							rel='noopener noreferrer'>
							<span className='underline'>{t('support')}</span>
							<ArrowTopRightOnSquareIcon className='h-4 w-4' />
						</a>
						{isLoading && <p>Fetching balance...</p>}
						{isError && <></>}
						{!isLoading && !isError && isConnected && (
							<p>
								{Number(data?.formatted).toFixed(2)} {data?.symbol}
							</p>
						)}
						<ConnectKitButton.Custom>
							{({ isConnected, show, unsupported, truncatedAddress, ensName }) => {
								return (
									<>
										{(() => {
											if (!isConnected) {
												return (
													<RoundedButton
														action={`${t('connect-wallet')}`}
														handleClick={show}
														type='button'></RoundedButton>
												);
											}

											if (unsupported) {
												return (
													<RoundedButton
														action={`${t('wrong-network')}`}
														handleClick={show}
														type='button'></RoundedButton>
												);
											}

											return (
												<Menu as='div' className='relative ml-3'>
													<Menu.Button
														type='button'
														className='address-link'
														id='user-menu-button'
														aria-expanded='false'
														aria-haspopup='true'>
														{ensName ?? truncatedAddress}
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
															<Menu.Item>
																{({ active }) => (
																	<a
																		className={combineClasses(
																			active ? 'bg-slate-100' : '',
																			'block px-4 py-2 text-sm text-slate-600 cursor-pointer'
																		)}>
																		{t('your-activity')}
																	</a>
																)}
															</Menu.Item>
															<Menu.Item>
																{({ active }) => (
																	<a
																		onClick={() => disconnect()}
																		className={combineClasses(
																			active ? 'bg-slate-100' : '',
																			'block px-4 py-2 text-sm text-slate-600 cursor-pointer'
																		)}>
																		{t('disconnect-wallet')}
																	</a>
																)}
															</Menu.Item>
														</Menu.Items>
													</Transition>
												</Menu>
											);
										})()}
									</>
								);
							}}
						</ConnectKitButton.Custom>
					</div>
				</>
			)}
		</Disclosure>
	);
}
