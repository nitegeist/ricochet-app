import { NextPage } from 'next';
interface Props {
	content: JSX.Element;
}

export const SmallCard: NextPage<Props> = ({ content }): JSX.Element => (
	<div className='card-sm'>
		{!content && (
			<div className='animate-pulse'>
				<div className='grid grid-rows-2 gap-2'>
					<div className='h-5 bg-slate-700 rounded'></div>
					<div className='h-6 bg-slate-700 rounded'></div>
				</div>
			</div>
		)}
		{!!content && content}
	</div>
);
