import { NextPage } from 'next';

interface Props {
	headers: string[];
	rowNumber: number;
}

export const TableLoader: NextPage<Props> = ({ headers, rowNumber }): JSX.Element => {
	const tableRows = [];
	const tableDescriptions = [];

	for (let i = 0; i < headers.length; i++) {
		tableDescriptions.push(<td key={i} className='h-4 bg-slate-700'></td>);
	}
	for (let i = 0; i < rowNumber; i++) {
		tableRows.push(
			<tr key={i} className='animate-pulse'>
				{tableDescriptions}
			</tr>
		);
	}

	return (
		<table className='border-separate border-spacing-2 min-w-full'>
			<thead>
				<tr>
					{headers.map((title, index) => (
						<th scope='col' key={index} className='font-normal text-slate-400 px-6 py-4 text-start'>
							{title}
						</th>
					))}
				</tr>
			</thead>
			<tbody>{tableRows}</tbody>
		</table>
	);
};
