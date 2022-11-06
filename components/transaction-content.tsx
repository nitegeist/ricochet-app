import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import BTCLogo from 'icons/btc-logo';
import ETHLogo from 'icons/eth-logo';
import RicochetLogo from 'icons/richochet-logo';
import { NextPage } from 'next';
import { Fragment, useState } from 'react';
import { RoundedButton } from './button';

const tokens = ['ETH', 'RIC', 'BTC'];
const tolerance = ['0.02%', '0.03%', '0.05%'];

interface Props {
	type: 'withdraw' | 'deposit' | 'swap';
	close: boolean;
	setClose: Function;
}

export const TransactionContent: NextPage<Props> = ({ type, close, setClose }) => {
	const [selectedToken, setSelectedToken] = useState(tokens[0]);
	const [swapFrom, setSwapFrom] = useState(tokens[0]);
	const [swapTo, setSwapTo] = useState(tokens[1]);
	const [amount, setAmount] = useState('');
	const [slippageTolerance, setSlippageTolerance] = useState(tolerance[0]);
	const handleSubmit = (event) => {
		event?.preventDefault();
	};
	return (
		<div className='flex flex-col items-start'>
			<form onSubmit={handleSubmit} className='flex flex-col items-start w-full space-y-6'>
				{(type === 'withdraw' || type === 'deposit') && (
					<>
						<label className='text-slate-100'>Which token do you wish to {type}?</label>
						<Listbox value={selectedToken} onChange={setSelectedToken}>
							<div className='relative w-full z-10'>
								<Listbox.Button className='relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left text-slate-200 shadow-md focus:outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm'>
									<div className='flex items-center whitespace-nowrap space-x-2'>
										<span>
											{selectedToken === 'ETH' ? (
												<ETHLogo width='22' height='22' />
											) : selectedToken === 'BTC' ? (
												<BTCLogo width='22' height='22' />
											) : selectedToken === 'RIC' ? (
												<RicochetLogo width='25' height='25' />
											) : (
												''
											)}
										</span>
										<span className='block truncate'>{selectedToken}</span>
									</div>{' '}
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
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
					</>
				)}
				{type === 'swap' && (
					<>
						<label className='text-slate-100'>
							Which {type === 'swap' ? 'tokens' : 'token'} do you wish to {type}?
						</label>
						<div className='flex items-center space-x-2 w-full'>
							<span className='text-slate-100'>From: </span>
							<Listbox value={swapFrom} onChange={setSwapFrom}>
								<div className='relative w-full z-20'>
									<Listbox.Button className='relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left text-slate-200 shadow-md focus:outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm'>
										<div className='flex items-center whitespace-nowrap space-x-2'>
											<span>
												{swapFrom === 'ETH' ? (
													<ETHLogo width='22' height='22' />
												) : swapFrom === 'BTC' ? (
													<BTCLogo width='22' height='22' />
												) : swapFrom === 'RIC' ? (
													<RicochetLogo width='25' height='25' />
												) : (
													''
												)}
											</span>
											<span className='block truncate'>{swapFrom}</span>
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
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>
						<div className='flex items-center space-x-2 w-full'>
							<span className='text-slate-100'>To: </span>
							<Listbox value={swapTo} onChange={setSwapTo}>
								<div className='relative w-full z-10'>
									<Listbox.Button className='relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left text-slate-200 shadow-md focus:outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm'>
										<div className='flex items-center whitespace-nowrap space-x-2'>
											<span>
												{swapTo === 'ETH' ? (
													<ETHLogo width='22' height='22' />
												) : swapTo === 'BTC' ? (
													<BTCLogo width='22' height='22' />
												) : swapTo === 'RIC' ? (
													<RicochetLogo width='25' height='25' />
												) : (
													''
												)}
											</span>
											<span className='block truncate'>{swapTo}</span>
										</div>{' '}
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
															</div>{' '}
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
					</>
				)}
				<label className='text-slate-100'>Which amount do you wish to {type}?</label>
				<input
					type='number'
					className='input-outline'
					value={amount}
					step='any'
					onChange={(e) => setAmount(e.target.value)}
					placeholder={type === 'swap' ? `Amount in ${swapFrom}` : 'Amount'}
				/>
				{type === 'swap' && (
					<>
						<label className='text-slate-100'>Choose slippage tolerance:</label>
						<Listbox value={slippageTolerance} onChange={setSlippageTolerance}>
							<div className='relative w-full z-10'>
								<Listbox.Button className='relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left text-slate-200 shadow-md focus:outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm'>
									<span className='block truncate'>{slippageTolerance}</span>
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
										{tolerance.map((tol, index) => (
											<Listbox.Option
												key={index}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active ? 'bg-slate-800 text-slate-200' : 'text-slate-200'
													}`
												}
												value={tol}>
												{({ selected }) => (
													<>
														<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{tol}</span>
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
						<p className='text-slate-100'>Minimum output amount: ...{swapTo}</p>
					</>
				)}
				<div className='flex space-x-4 w-full justify-end'>
					<button type='button' className='text-slate-100 underline' onClick={() => setClose(!close)}>
						cancel
					</button>
					<RoundedButton type='submit' action={`confirm ${type}`} />
				</div>
			</form>
		</div>
	);
};
