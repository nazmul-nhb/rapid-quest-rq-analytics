export type CLTVData = {
	totalCLTV: number;
	customerCount: number;
	month: string;
};

export type CLTVChartProps = {
	CLTVReport: CLTVData[];
};
