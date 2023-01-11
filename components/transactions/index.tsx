import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import AlertAction from '@richochet/utils/alertAction';
import { Coin, namesCoin, namesCoinX } from 'constants/coins';
import { downgradeTokensList } from 'constants/downgradeConfig';
import { upgradeTokensList } from 'constants/upgradeConfig';
import { AlertContext } from 'contexts/AlertContext';
import { BalanceAction } from 'enumerations/balanceActions.enum';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { Fragment, useContext, useState } from 'react';
import streamApi from 'redux/slices/streams.slice';
import { RoundedButton } from '../button';
import TokenList from '../token-list';

const tolerance = ['0.02%', '0.03%', '0.05%'];

interface Props {
	type: BalanceAction;
	close: boolean;
	setClose: Function;
}

const downgradeTokens = downgradeTokensList.map((token) => token.coin);
const upgradeTokens = upgradeTokensList.map((token) => token.coin);
const coins = [...namesCoin, ...namesCoinX];

export const Transactions: NextPage<Props> = ({ type, close, setClose }) => {
	const { t } = useTranslation('home');
	const [state, dispatch] = useContext(AlertContext);
	const [selectedToken, setSelectedToken] = useState<Coin>(type === BalanceAction.Withdraw ? Coin.WETHx : Coin.ETH);
	const [swapFrom, setSwapFrom] = useState<Coin>(Coin.BTC);
	const [swapTo, setSwapTo] = useState<Coin>(Coin.ETH);
	const [amount, setAmount] = useState('');
	const [slippageTolerance, setSlippageTolerance] = useState(tolerance[0]);
	const [upgradeTrigger] = streamApi.useLazyUpgradeQuery();
	const [downgradeTrigger] = streamApi.useLazyDowngradeQuery();
	const handleSubmit = (event: any) => {
		event?.preventDefault();
		dispatch(AlertAction.showLoadingAlert('Waiting for your transaction to be confirmed...', ''));
		if (type === BalanceAction.Withdraw) {
			const token = downgradeTokensList.find((token) => token.coin === selectedToken);
			console.log({ token });
			const downgrade = downgradeTrigger({ value: amount, tokenAddress: token?.tokenAddress! });
			console.log({ downgrade });
			downgrade
				.then((response) => {
					if (response.isSuccess) {
						dispatch(AlertAction.showSuccessAlert('Success', 'Transaction confirmed 👌'));
					}
					if (response.isError) {
						dispatch(AlertAction.showErrorAlert('Error', `${response?.error}`));
					}
					setTimeout(() => {
						dispatch(AlertAction.hideAlert());
					}, 5000);
				})
				.catch((error) => dispatch(AlertAction.showErrorAlert('Error', `${error || error?.message}`)));
		} else if (type === BalanceAction.Deposit) {
			const token = upgradeTokensList.find((token) => token.coin === selectedToken);
			console.log({ token });
			const upgrade = upgradeTrigger({ value: amount, tokenAddress: token?.tokenAddress! });
			console.log({ upgrade });
			upgrade
				.then((response) => {
					if (response.isSuccess) {
						dispatch(AlertAction.showSuccessAlert('Success', 'Transaction confirmed 👌'));
					}
					if (response.isError) {
						dispatch(AlertAction.showErrorAlert('Error', `${response?.error}`));
					}
					setTimeout(() => {
						dispatch(AlertAction.hideAlert());
					}, 5000);
				})
				.catch((error) => dispatch(AlertAction.showErrorAlert('Error', `${error || error?.message}`)));
		}
	};
	return (
		<div className='flex flex-col items-start'>
			<form onSubmit={handleSubmit} className='flex flex-col items-start w-full space-y-6'>
				{(type === BalanceAction.Withdraw || type === BalanceAction.Deposit) && (
					<>
						<label className='text-slate-100'>
							{t('token-action')} {t(type)}?
						</label>
						<TokenList
							value={selectedToken}
							coins={
								type === BalanceAction.Withdraw ? downgradeTokens : type === BalanceAction.Deposit ? upgradeTokens : []
							}
							handleChange={setSelectedToken}
						/>
					</>
				)}
				{type === BalanceAction.Swap && (
					<>
						<label className='text-slate-100'>
							{type === BalanceAction.Swap ? t('tokens-action') : t('token-action')} {t(type)}?
						</label>
						<div className='flex items-center space-x-2 w-full'>
							<span className='text-slate-100'>{t('from')}: </span>
							<TokenList classNames='relative w-full z-30' value={swapFrom} coins={coins} handleChange={setSwapFrom} />
						</div>
						<div className='flex items-center space-x-2 w-full'>
							<span className='text-slate-100'>{t('to')}: </span>
							<TokenList classNames='relative w-full z-20' value={swapTo} coins={coins} handleChange={setSwapTo} />
						</div>
					</>
				)}
				<label className='text-slate-100'>
					{t('amount-action')} {t(type)}?
				</label>
				<input
					type='number'
					className='input-outline'
					value={amount}
					step='any'
					onChange={(e) => setAmount(e.target.value)}
					placeholder={type === BalanceAction.Swap ? `${t('amount-in')!} ${swapFrom}` : t('amount')!}
				/>
				{type === BalanceAction.Swap && (
					<>
						<label className='text-slate-100'>{t('slippage-tolerance')}:</label>
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
						<p className='text-slate-100'>
							{t('min-output-amt')}: ...{swapTo}
						</p>
					</>
				)}
				<div className='flex space-x-4 w-full justify-end'>
					<button type='button' className='text-slate-100 underline' onClick={() => setClose(!close)}>
						{t('cancel')}
					</button>
					<RoundedButton type='submit' action={`${t('confirm')} ${t(type)}`} />
				</div>
			</form>
		</div>
	);
};
