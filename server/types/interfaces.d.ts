export interface ErrorObject extends Error {
	status?: number;
}

export interface CityData {
	city: string;
	count: number;
}
