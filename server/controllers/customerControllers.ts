import { Request, Response } from "express";
import { ShopifyCustomer } from "../models/ShopifyCustomer";
import { PipelineStage } from "mongoose";

// get all customers
export const getCustomers = async (req: Request, res: Response) => {
	try {
		const customers = await ShopifyCustomer.find();

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
