import { CityData } from "../types/interfaces";

// Function to prepare city data for visualization
export const prepareCityData = (cities: string[]): CityData[] => {
	const cityCounts = cities.reduce((acc, city) => {
		if (city) {
			acc[city] = (acc[city] || 0) + 1;
		}
		return acc;
	}, {} as { [key: string]: number });

	return Object.entries(cityCounts).map(([city, count]) => ({ city, count }));
};
