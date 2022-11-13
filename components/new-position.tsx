import { Listbox, Transition } from '@headlessui/react';
import { ArrowLongRightIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import BTCLogo from 'icons/btc-logo';
import ETHLogo from 'icons/eth-logo';
import RicochetLogo from 'icons/richochet-logo';
import { NextPage } from 'next';
import { Fragment, useState } from 'react';
import { RoundedButton } from './button';
import { LineGraph } from './line-graph';

const tokens = ['ETH', 'RIC', 'BTC'];
const postionTypes = ['anually', 'bi-weekly', '∞ continuous (monthly)', 'weekly'];

interface Props {
	close: boolean;
	setClose: Function;
}

export const NewPosition: NextPage<Props> = ({ close, setClose }) => {
	const [from, setFrom] = useState(tokens[0]);
	const [to, setTo] = useState(tokens[1]);
	const [amount, setAmount] = useState('');
	const [positionType, setPositionType] = useState(postionTypes[2]);
	const handleSubmit = (event) => {
		event?.preventDefault();
		console.log({ from, to, amount, positionType });
	};
	return (
		<>
			<p className='text-primary-500 uppercase'>Your Positions</p>
			<div className='flex flex-wrap items-center justify-between space-y-4 mt-4'>
				<form
					id='new-position-form'
					className='flex flex-col items-start lg:p-8 w-full lg:w-1/2 space-y-6'
					onSubmit={handleSubmit}>
					<label className='text-slate-100'>Which token do you wish to use?</label>
					<div className='flex items-center space-x-4 w-full lg:w-auto'>
						<Listbox value={from} onChange={setFrom}>
							<div className='relative w-full z-10'>
								<Listbox.Button className='relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left text-slate-200 shadow-md focus:outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm'>
									<div className='flex items-center whitespace-nowrap space-x-2'>
										<span>
											{from === 'ETH' ? (
												<ETHLogo width='22' height='22' />
											) : from === 'BTC' ? (
												<BTCLogo width='22' height='22' />
											) : from === 'RIC' ? (
												<RicochetLogo width='25' height='25' />
											) : (
												''
											)}
										</span>
										<span className='block truncate'>{from}</span>
									</div>
									<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
										<ChevronUpDownIcon className='h-5 w-5 text-slate-100' aria-hidden='true' />
									</span>
								</Listbox.Button>
								<Transition
									as={Fragment}
									leave='transition ease-in duration-100'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'>
									<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
										{tokens.map((token, index) => (
											<Listbox.Option
												key={index}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active ? 'bg-slate-800 text-slate-200' : 'text-slate-200'
													}`
												}
												value={token}>
												{({ selected }) => (
													<>
														<div className='flex items-center whitespace-nowrap space-x-2'>
															<span>
																{token === 'ETH' ? (
																	<ETHLogo width='22' height='22' />
																) : token === 'BTC' ? (
																	<BTCLogo width='22' height='22' />
																) : token === 'RIC' ? (
																	<RicochetLogo width='25' height='25' />
																) : (
																	''
																)}
															</span>
															<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
																{token}
															</span>
														</div>
														{selected ? (
															<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
																<CheckIcon className='h-5 w-5' aria-hidden='true' />
															</span>
														) : null}

														{selected ? (
															<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
																<CheckIcon className='h-5 w-5' aria-hidden='true' />
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
						<ArrowLongRightIcon className='h-10 w-16' />
						<Listbox value={to} onChange={setTo}>
							<div className='relative w-full z-10'>
								<Listbox.Button className='relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left text-slate-200 shadow-md focus:outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm'>
									<div className='flex items-center whitespace-nowrap space-x-2'>
										<span>
											{to === 'ETH' ? (
												<ETHLogo width='22' height='22' />
											) : to === 'BTC' ? (
												<BTCLogo width='22' height='22' />
											) : to === 'RIC' ? (
												<RicochetLogo width='25' height='25' />
											) : (
												''
											)}
										</span>
										<span className='block truncate'>{to}</span>
									</div>
									<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
										<ChevronUpDownIcon className='h-5 w-5 text-slate-100' aria-hidden='true' />
									</span>
								</Listbox.Button>
								<Transition
									as={Fragment}
									leave='transition ease-in duration-100'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'>
									<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
										{tokens.map((token, index) => (
											<Listbox.Option
												key={index}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active ? 'bg-slate-800 text-slate-200' : 'text-slate-200'
													}`
												}
												value={token}>
												{({ selected }) => (
													<>
														<div className='flex items-center whitespace-nowrap space-x-2'>
															<span>
																{token === 'ETH' ? (
																	<ETHLogo width='22' height='22' />
																) : token === 'BTC' ? (
																	<BTCLogo width='22' height='22' />
																) : token === 'RIC' ? (
																	<RicochetLogo width='25' height='25' />
																) : (
																	''
																)}
															</span>
															<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
																{token}
															</span>
														</div>
														{selected ? (
															<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
																<CheckIcon className='h-5 w-5' aria-hidden='true' />
															</span>
														) : null}

														{selected ? (
															<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
																<CheckIcon className='h-5 w-5' aria-hidden='true' />
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
					</div>
					<label className='text-slate-100'>Which amount do you wish to set for this new position?</label>
					<input
						type='number'
						step='any'
						className='input-outline'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder='Amount'
					/>
					<label className='text-slate-100'>Select the position-type you wish to start:</label>
					<Listbox value={positionType} onChange={setPositionType}>
						<div className='relative w-full z-10'>
							<Listbox.Button className='relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left text-slate-200 shadow-md focus:outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm'>
								<span className='block truncate'>{positionType}</span>
								<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
									<ChevronUpDownIcon className='h-5 w-5 text-slate-100' aria-hidden='true' />
								</span>
							</Listbox.Button>
							<Transition
								as={Fragment}
								leave='transition ease-in duration-100'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'>
								<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
									{postionTypes.map((type, index) => (
										<Listbox.Option
											key={index}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active ? 'bg-slate-800 text-slate-200' : 'text-slate-200'
												}`
											}
											value={type}>
											{({ selected }) => (
												<>
													<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{type}</span>
													{selected ? (
														<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
															<CheckIcon className='h-5 w-5' aria-hidden='true' />
														</span>
													) : null}

													{selected ? (
														<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
															<CheckIcon className='h-5 w-5' aria-hidden='true' />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</Listbox>
				</form>
				<div className='w-full lg:w-1/2'>
					<LineGraph />
				</div>
				<div className='flex space-x-4 w-full justify-end'>
					<button type='button' className='text-slate-100 underline' onClick={() => setClose(!close)}>
						cancel
					</button>
					<RoundedButton type='submit' form='new-position-form' action='start new position' />
				</div>
			</div>
		</>
	);
};
