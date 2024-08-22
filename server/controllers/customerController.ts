import express, { Request, Response } from "express";
import { ShopifyCustomer } from "../models/CustomerModel";

// get all customers
export const getCustomers = async (req: Request, res: Response) => {
	try {
		const customers = await ShopifyCustomer.find().limit(50);
		console.log(`Fetched ${customers.length} customers`);
		res.status(200).send(customers);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Getting Customers: ", error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
			console.error(error.message);
		} else {
			console.error("An Unknown Error Occurred!");
			res.status(500).send({
				success: false,
				message: "Internal Server Error!",
			});
		}
	}
};
