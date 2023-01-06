export type Flow = {
	lastUpdate: string;
	flowRate: string;
	sum: string;
	recipient?: {
		id: string;
	};
	owner?: {
		id: string;
	};
	token: {
		id: string;
		symbol: string;
	};
	events: Array<{
		flowRate: string;
		sum: string;
		transaction: {
			timestamp: string;
		};
	}>;
};
