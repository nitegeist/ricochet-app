import { Listbox, Transition } from '@headlessui/react';
import { ArrowLongRightIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { Coin } from 'constants/coins';
import { FlowEnum, FlowTypes } from 'constants/flowConfig';
import { RICAddress, twoWayMarketRICUSDCAddress, USDCxAddress } from 'constants/polygon_config';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { Fragment, useState } from 'react';
import { startStream } from 'redux/actions/stream';
import { useAppDispatch } from 'redux/hooks';
import { RoundedButton } from '../button';
import { AreaGraph } from '../graphs';
import TokenList from '../token-list';

const tokens = ['ETH', 'RIC', 'BTC'];
const postionTypes = ['annually', 'bi-weekly', 'continuous', 'weekly'];

interface Props {
	close: boolean;
	setClose: Function;
}

export const NewPosition: NextPage<Props> = ({ close, setClose }) => {
	const { t } = useTranslation('home');
	const [from, setFrom] = useState(Coin.BTC);
	const dispatch = useAppDispatch();
	const [to, setTo] = useState(Coin.RIC);
	const [amount, setAmount] = useState('1');
	const [positionType, setPositionType] = useState(postionTypes[2]);
	const handleSubmit = (event: any) => {
		console.log('Made it to handle submit!');
		event?.preventDefault();
		// Need to call hook here to start a new stream.
		const config = {
			superToken: twoWayMarketRICUSDCAddress,
			tokenA: RICAddress,
			tokenB: USDCxAddress,
			coinA: Coin.RIC,
			coinB: Coin.USDC,
			flowKey: FlowEnum.twoWayRicUsdcFlowQuery,
			type: FlowTypes.market,
		};
		//@ts-ignore
		const stream = dispatch(startStream({ type: 'start', payload: { amount, config } }));
		console.log({ stream });
	};
	return (
		<>
			<p className='text-primary-500 uppercase'>{t('your-positions')}</p>
			<div className='flex flex-wrap items-center justify-between space-y-8 lg:space-y-0 mt-4'>
				<form
					id='new-position-form'
					className='flex flex-col items-start lg:p-8 w-full lg:w-1/2 space-y-6'
					onSubmit={handleSubmit}>
					<label className='text-slate-100'>{t('token-action')}?</label>
					<div className='flex items-center space-x-4 w-full lg:w-auto'>
						<TokenList value={from} handleChange={setFrom} />
						<ArrowLongRightIcon className='h-10 w-16' />
						<TokenList value={to} handleChange={setTo} />
					</div>
					<label className='text-slate-100'>{t('position-amount')}?</label>
					<input
						type='number'
						step='any'
						className='input-outline'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder={`${t('amount')}`}
					/>
					<label className='text-slate-100'>{t('position-select')}:</label>
					<Listbox value={positionType} onChange={setPositionType}>
						<div className='relative w-full z-10'>
							<Listbox.Button className='relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left text-slate-200 shadow-md focus:outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm'>
								<span className='block truncate'>{t(`${positionType.toLocaleLowerCase().replace(/\s/g, '-')}`)}</span>
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
													<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
														{t(`${type.toLocaleLowerCase().replace(/\s/g, '-')}`)}
													</span>
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
					<AreaGraph />
				</div>
				<div className='flex space-x-4 w-full justify-end'>
					<button type='button' className='text-slate-100 underline' onClick={() => setClose(!close)}>
						{t('cancel')}
					</button>
					<RoundedButton type='submit' form='new-position-form' action={`${t('start-new-position')}`} />
				</div>
			</div>
		</>
	);
};
