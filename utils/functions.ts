export const combineClasses = (...classes: string[]) => classes.filter(Boolean).join(' ');
export const formatCurrency = (number: number, currency: string = 'USD') =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
		useGrouping: true,
	}).format(number);
