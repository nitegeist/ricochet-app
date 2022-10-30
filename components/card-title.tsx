import { NextPage } from 'next';

interface Props {
	content: JSX.Element;
}

export const CardTitle: NextPage<Props> = ({ content }) => {
	return (
		<div className='flex flex-wrap items-center justify-between space-y-4 md:space-y-0 mb-10'>
			{content}
		</div>
	);
};
