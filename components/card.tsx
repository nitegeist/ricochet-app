import { NextPage } from 'next';

interface Props {
	content: JSX.Element;
}

export const Card: NextPage<Props> = ({ content }) => {
	return <div className='card'>{content}</div>;
};
