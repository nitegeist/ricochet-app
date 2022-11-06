import { Tab } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import { TransactionContent } from './transaction-content';

interface Props {
	action: number;
	close: boolean;
	setClose: Function;
}

export const BalanceTabs: NextPage<Props> = ({ close, setClose, action }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	useEffect(() => {
		setSelectedIndex(action);
	}, [action]);
	return (
		<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
			<Tab.List className='flex items-center justify-between border-b-2 border-primary-900 border-opacity-30 mb-8'>
				<Tab as={Fragment}>
					{({ selected }) => (
						<button
							className={selected ? 'text-slate-100 border-b-2 border-primary-500' : 'text-slate-400 border-none'}>
							withdraw
						</button>
					)}
				</Tab>
				<Tab as={Fragment}>
					{({ selected }) => (
						<button
							className={selected ? 'text-slate-100 border-b-2 border-primary-500' : 'text-slate-400 border-none'}>
							deposit
						</button>
					)}
				</Tab>
				<Tab as={Fragment}>
					{({ selected }) => (
						<button
							className={selected ? 'text-slate-100 border-b-2 border-primary-500' : 'text-slate-400 border-none'}>
							swap
						</button>
					)}
				</Tab>
				<button className='text-slate-400 hover:text-slate-100' onClick={() => setClose(!close)}>
					<XMarkIcon className='h-4 w-4' />
				</button>
			</Tab.List>
			<Tab.Panels>
				<Tab.Panel>
					<TransactionContent type='withdraw' close={close} setClose={setClose} />
				</Tab.Panel>
				<Tab.Panel>
					<TransactionContent type='deposit' close={close} setClose={setClose} />
				</Tab.Panel>
				<Tab.Panel>
					<TransactionContent type='swap' close={close} setClose={setClose} />
				</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	);
};
