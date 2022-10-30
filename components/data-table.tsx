import { NextPage } from 'next';
import { MarketData, PositionData } from 'pages';
import { TokenData } from './balances';

interface Props {
	headers: string[];
	rowData: PositionData[] | MarketData[] | TokenData[];
}

const isPositionData = (data: PositionData | MarketData | TokenData): data is PositionData =>
	!!(data as PositionData).symbol;
const isMarketData = (data: PositionData | MarketData | TokenData): data is MarketData => !!(data as MarketData).market;
const isTokenData = (data: PositionData | MarketData | TokenData): data is TokenData => !!(data as TokenData).token;

export const DataTable: NextPage<Props> = ({ headers, rowData }): JSX.Element => {
	return (
		<div className='overflow-scroll'>
			<table className='table-fixed min-w-full text-center'>
				<thead>
					<tr>
						{headers.map((title, index) => (
							<th scope='col' key={index} className='font-normal text-slate-400 px-6 py-4"'>
								{title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rowData.map((data, index) => (
						<tr key={index} className='text-slate-200 border-b border-slate-600'>
							{isPositionData(data) ? (
								<>
									<td className='px-6 py-4 whitespace-nowrap'>{data.symbol}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.position}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.timeLeft}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.input}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.output}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.avgPrice}</td>
								</>
							) : isMarketData(data) ? (
								<>
									<td className='px-6 py-4 whitespace-nowrap'>{data.market}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.total}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.posAmt}</td>
								</>
							) : isTokenData(data) ? (
								<>
									<td className='px-6 py-4 whitespace-nowrap'>{data.token}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.amount}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.dollarVal}</td>
								</>
							) : (
								<></>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
