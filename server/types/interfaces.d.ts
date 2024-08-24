export interface ErrorObject extends Error {
	status?: number;
	message?: string;
}

export interface CityData {
	city: string;
	count: number;
}
