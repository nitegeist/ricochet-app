import { NextPage } from 'next';

interface Props {
	content: JSX.Element;
}

export const CardContainer: NextPage<Props> = ({ content }) => {
	return <div className='card-container'>{content}</div>;
};
