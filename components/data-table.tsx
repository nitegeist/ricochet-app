import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import usePagination from 'hooks/usePagination';
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
	const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, gaps, setPage, totalPages } = usePagination({
		contentPerPage: 6,
		count: rowData.length,
	});
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
					{rowData.slice(firstContentIndex, lastContentIndex).map((data, index) => (
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
			<div className='flex justify-end text-slate-500 space-x-2 mt-4'>
				<button
					onClick={prevPage}
					className={`${page !== 1 && 'hover:text-slate-300'} ${page === 1 && 'text-slate-600'}`}
					disabled={page === 1}>
					<ChevronLeftIcon className='h-4 w-4' />
				</button>
				<button onClick={() => setPage(1)} className={`${page === 1 && 'text-slate-100'}`}>
					1
				</button>
				{gaps.before ? '...' : ''}
				{gaps.paginationGroup.map((num) => (
					<button onClick={() => setPage(num)} key={num} className={`${page === num ? 'text-slate-100' : ''}`}>
						{num}
					</button>
				))}
				{gaps.after ? '...' : ''}
				{totalPages > 1 && (
					<button onClick={() => setPage(totalPages)} className={`${page === totalPages && 'text-slate-100'}`}>
						{totalPages}
					</button>
				)}
				<button
					onClick={nextPage}
					className={`${page !== totalPages && 'hover:text-slate-300'} ${page === totalPages && 'text-slate-600'}`}
					disabled={page === totalPages}>
					<ChevronRightIcon className='h-4 w-4' />
				</button>
			</div>
		</div>
	);
};
