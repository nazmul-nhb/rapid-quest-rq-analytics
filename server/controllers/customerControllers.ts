import { Request, Response } from "express";
import { ShopifyCustomer } from "../models/ShopifyCustomer";
import { ShopifyOrder } from "../models/ShopifyOrder";
import { PipelineStage } from "mongoose";
import { getCustomerCities } from "../utils/getCustomerCities";
import { prepareCityData } from "../utils/prepareCityData";

// get all customers
export const getCustomers = async (req: Request, res: Response) => {
	try {
		const customers = await ShopifyCustomer.find(
			{},
			{
				_id: 1,
				first_name: 1,
				last_name: 1,
				email: 1,
				verified_email: 1,
				created_at: 1,
				updated_at: 1,
				state: 1,
				orders_count: 1,
				total_spent: 1,
				default_address: {
					city: 1,
					province: 1,
					country: 1,
					zip: 1,
				},
			}
		);

		return res.status(200).send(customers);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Fetching Customers: ", error.message);
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

// Get new customers added over time
export const getNewCustomersOverTime = async (req: Request, res: Response) => {
	try {
		const interval = req.query.interval as string;

		const groupBy: Record<string, any> = {
			daily: {
				year: { $year: "$created_at" },
				month: { $month: "$created_at" },
				day: { $dayOfMonth: "$created_at" },
			},
			monthly: {
				year: { $year: "$created_at" },
				month: { $month: "$created_at" },
			},
			quarterly: {
				year: { $year: "$created_at" },
				quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } },
			},
			yearly: { year: { $year: "$created_at" } },
		};

		if (!interval || !groupBy[interval]) {
			return res.status(400).send({
				success: false,
				message:
					"Invalid interval. Please use 'daily', 'monthly', 'quarterly', or 'yearly'.",
			});
		}

		// New Customers Pipeline
		const newCustomersPipeline: PipelineStage[] = [
			{
				$project: {
					created_at: {
						$dateFromString: { dateString: "$created_at" }, // Convert string to Date
					},
				},
			},
			{
				$group: {
					_id: groupBy[interval],
					newCustomers: { $sum: 1 }, // Count new customers
				},
			},
			{
				$project: {
					_id: 0,
					time: "$_id",
					newCustomers: 1,
				},
			},
			{
				$sort: {
					"_id.year": 1,
					"_id.quarter": 1,
					"_id.month": 1,
					"_id.day": 1,
				},
			},
		];

		// Execute new customers pipeline
		const newCustomersResult = await ShopifyCustomer.aggregate(
			newCustomersPipeline
		);

		return res.status(200).send({
			success: true,
			data: newCustomersResult,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Fetching New Customers: ", error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			console.error("An Unknown Error Occurred!");
			res.status(500).send({
				success: false,
				message: "Internal Server Error!",
			});
		}
	}
};

// Get number of repeat customers
export const getRepeatCustomers = async (req: Request, res: Response) => {
	try {
		const interval = req.query.interval as string;

		// Define the grouping criteria based on the time interval
		const groupBy: Record<string, any> = {
			daily: {
				year: { $year: "$created_at" },
				month: { $month: "$created_at" },
				day: { $dayOfMonth: "$created_at" },
			},
			monthly: {
				year: { $year: "$created_at" },
				month: { $month: "$created_at" },
			},
			quarterly: {
				year: { $year: "$created_at" },
				quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } },
			},
			yearly: { year: { $year: "$created_at" } },
		};

		if (!interval || !groupBy[interval]) {
			return res.status(400).send({
				success: false,
				message:
					"Invalid interval. Please use 'daily', 'monthly', 'quarterly', or 'yearly'.",
			});
		}

		// Repeat Customers Pipeline
		const repeatCustomersPipeline: PipelineStage[] = [
			{
				$project: {
					created_at: {
						$dateFromString: { dateString: "$created_at" }, // Ensure `created_at` is a Date object
					},
					customer_id: "$customer.id", // Adjust if the customer ID is nested
				},
			},
			{
				$group: {
					_id: {
						customer_id: "$customer_id",
						time: groupBy[interval],
					},
					purchaseCount: { $sum: 1 }, // Count purchases
				},
			},
			{
				$match: {
					purchaseCount: { $gt: 1 }, // Find customers with more than one purchase
				},
			},
			{
				$group: {
					_id: "$_id.time",
					repeatCustomers: { $addToSet: "$_id.customer_id" }, // Aggregate repeat customer IDs
				},
			},
			{
				$project: {
					_id: 0,
					time: "$_id",
					repeatCustomerCount: { $size: "$repeatCustomers" }, // Count distinct repeat customers
				},
			},
			{
				$sort: {
					"time.year": 1,
					"time.quarter": 1,
					"time.month": 1,
					"time.day": 1,
				},
			},
		];

		// Execute repeat customers pipeline
		const repeatCustomersResult = await ShopifyOrder.aggregate(
			repeatCustomersPipeline
		);

		return res.status(200).send({
			success: true,
			data: repeatCustomersResult,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Fetching Repeat Customers: ", error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			console.error("An Unknown Error Occurred!");
			res.status(500).send({
				success: false,
				message: "Internal Server Error!",
			});
		}
	}
};

// Get geographical distribution of customers
export const getCustomerDistribution = async (req: Request, res: Response) => {
	try {
		const cities = await getCustomerCities();
		const cityData = prepareCityData(cities);

		return res.status(200).send({ success: true, data: cityData });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Fetching Cities: ", error.message);
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
