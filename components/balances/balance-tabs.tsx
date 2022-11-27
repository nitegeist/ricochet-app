import { Tab } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { BalanceAction } from 'enumerations/balanceActions.enum';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { Fragment, useEffect, useState } from 'react';
import { TransactionContent } from '../transactions';

interface Props {
	action: number;
	close: boolean;
	setClose: Function;
}

export const BalanceTabs: NextPage<Props> = ({ close, setClose, action }) => {
	const { t } = useTranslation('home');
	const [selectedIndex, setSelectedIndex] = useState(0);
	useEffect(() => {
		setSelectedIndex(action);
	}, [action]);
	return (
		<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
			<Tab.List className='flex items-center justify-between border-b-2 border-primary-900 border-opacity-30 mb-8 mt-4'>
				<Tab as={Fragment}>
					{({ selected }) => (
						<button
							className={selected ? 'text-slate-100 border-b-2 border-primary-500' : 'text-slate-400 border-none'}>
							{t('withdraw')}
						</button>
					)}
				</Tab>
				<Tab as={Fragment}>
					{({ selected }) => (
						<button
							className={selected ? 'text-slate-100 border-b-2 border-primary-500' : 'text-slate-400 border-none'}>
							{t('deposit')}
						</button>
					)}
				</Tab>
				<Tab as={Fragment}>
					{({ selected }) => (
						<button
							className={selected ? 'text-slate-100 border-b-2 border-primary-500' : 'text-slate-400 border-none'}>
							{t('swap')}
						</button>
					)}
				</Tab>
				<button className='text-slate-400 hover:text-slate-100' onClick={() => setClose(!close)}>
					<XMarkIcon className='h-4 w-4' />
				</button>
			</Tab.List>
			<Tab.Panels>
				<Tab.Panel>
					<TransactionContent type={BalanceAction.Withdraw} close={close} setClose={setClose} />
				</Tab.Panel>
				<Tab.Panel>
					<TransactionContent type={BalanceAction.Deposit} close={close} setClose={setClose} />
				</Tab.Panel>
				<Tab.Panel>
					<TransactionContent type={BalanceAction.Swap} close={close} setClose={setClose} />
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	);
};
