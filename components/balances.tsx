import { formatCurrency } from '@richochet/utils/functions';
import { useState } from 'react';
import { BalanceTabs } from './balance-tabs';
import { OutlineButton, SolidButton } from './button';
import { DataChart } from './data-chart';
import { DataTable } from './data-table';

export interface TokenData {
	token: string;
	amount: number;
	dollarVal: string;
}

const headerTitles = ['token', 'amount', 'dollar-value'];
const tokenData: TokenData[] = [
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
	{
		token: 'BTC',
		amount: 0.879,
		dollarVal: formatCurrency(2212.89),
	},
	{
		token: 'RIC',
		amount: 6893,
		dollarVal: formatCurrency(46.456),
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
];

export const Balances = (): JSX.Element => {
	const [action, setAction] = useState(0);
	const [tabsClosed, setTabsClosed] = useState(true);
	return (
		<>
			{!tabsClosed && <BalanceTabs close={tabsClosed} setClose={setTabsClosed} action={action} />}
			{tabsClosed && (
				<>
					<p className='font-light uppercase tracking-widest text-slate-400'> Your Balances</p>
					<div className='flex flex-wrap items-center justify-evenly basis-1/3 my-4'>
						<OutlineButton
							type='button'
							action='withdraw'
							handleClick={() => {
								setTabsClosed(false);
								setAction(0);
							}}
						/>
						<SolidButton
							type='button'
							action='deposit'
							primary={true}
							handleClick={() => {
								setTabsClosed(false);
								setAction(1);
							}}
						/>
						<OutlineButton
							type='button'
							action='swap'
							handleClick={() => {
								setTabsClosed(false);
								setAction(2);
							}}
						/>
					</div>
					<div className='flex justify-center my-4'>
						<DataChart />
					</div>
					<DataTable headers={headerTitles} rowData={tokenData} />
				</>
			)}
		</>
	);
};
