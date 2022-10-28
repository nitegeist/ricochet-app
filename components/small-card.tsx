import { NextPage } from 'next';

interface Props {
	title?: string;
	value?: string;
}

export const SmallCard: NextPage<Props> = ({ title, value }) => {
	return (
		<div className='card-sm'>
			<h6 className='font-light uppercase tracking-widest text-slate-400'>{title}</h6>
			<p className='text-slate-100 font-light text-2xl'>{value}</p>
		</div>
	);
};
