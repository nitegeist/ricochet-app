import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { OutlineButton, SolidButton } from '../button';
import { DoughnutChart } from '../graphs';
import { DataTable } from '../table';
import { BalanceTabs } from './balance-tabs';

export interface TokenData {
	token: string;
	amount: number;
	dollarVal: number;
}

const headerTitles = ['token', 'amount', 'dollar-value'];
const tokenData: TokenData[] = [
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: 6856.45,
	},
	{
		token: 'BTC',
		amount: 0.879,
		dollarVal: 2212.89,
	},
	{
		token: 'RIC',
		amount: 6893,
		dollarVal: 46.456,
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: 6856.45,
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: 6856.45,
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: 6856.45,
	},
];

export const Balances = (): JSX.Element => {
	const { t } = useTranslation('home');
	const [action, setAction] = useState(0);
	const [tabsClosed, setTabsClosed] = useState(true);
	return (
		<>
			<p className='font-light uppercase tracking-widest text-primary-500'>{t('your-balances')}</p>
			{!tabsClosed && <BalanceTabs close={tabsClosed} setClose={setTabsClosed} action={action} />}
			{tabsClosed && (
				<>
					<div className='flex flex-wrap items-center justify-evenly basis-1/3 my-4'>
						<OutlineButton
							type='button'
							action={`${t('withdraw')}`}
							handleClick={() => {
								setTabsClosed(false);
								setAction(0);
							}}
						/>
						<SolidButton
							type='button'
							action={`${t('deposit')}`}
							primary={true}
							handleClick={() => {
								setTabsClosed(false);
								setAction(1);
							}}
						/>
						<OutlineButton
							type='button'
							action={`${t('swap')}`}
							handleClick={() => {
								setTabsClosed(false);
								setAction(2);
							}}
						/>
					</div>
					<div className='flex justify-center my-4'>
						<DoughnutChart tokens={tokenData} />
					</div>
					<DataTable headers={headerTitles} rowData={tokenData} tableLoaderRows={6} />
				</>
			)}
		</>
	);
};
