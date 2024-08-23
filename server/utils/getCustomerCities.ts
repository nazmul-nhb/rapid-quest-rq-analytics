import { ShopifyCustomer } from "../models/ShopifyCustomer";

// Function to fetch customer cities from MongoDB
export const getCustomerCities = async (): Promise<string[]> => {
	try {
		const customers = await ShopifyCustomer.find(
			{},
			"default_address.city"
		).exec();
		return customers
			.map((customer) => customer.default_address?.city)
			.filter((city) => city !== null) as string[];
	} catch (error) {
		console.error("Error Fetching Cities: ", error);
		return [];
	}
};
