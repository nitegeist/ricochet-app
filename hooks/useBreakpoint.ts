import { useEffect, useState } from 'react';
import breakpoints from '../utils/breakpoints';

const useBreakpoint = () => {
	const [breakpoint, setBreakPoint] = useState('');
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});

	const handleResize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();

		if (0 < windowSize?.width && windowSize?.width < 640) {
			setBreakPoint(breakpoints[640]);
		}
		if (640 < windowSize.width && windowSize.width < 768) {
			setBreakPoint(breakpoints[768]);
		}
		if (768 < windowSize.width && windowSize.width < 1024) {
			setBreakPoint(breakpoints[1024]);
		}
		if (1024 < windowSize.width && windowSize.width < 1280) {
			setBreakPoint(breakpoints[1280]);
		}
		if (windowSize.width >= 1536) {
			setBreakPoint(breakpoints[1536]);
		}

		return () => window.removeEventListener('resize', handleResize);
	}, [windowSize.width]);
	return breakpoint;
};

export default useBreakpoint;
