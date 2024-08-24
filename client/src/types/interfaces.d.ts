export interface ICLTVResponse {
	success: boolean;
	CLTVReport: ICLTVReport[];
}

export interface ICLTVReport {
	totalCLTV: number;
	customerCount: number;
	month: string;
}
