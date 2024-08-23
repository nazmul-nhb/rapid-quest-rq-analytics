import { Request, Response } from "express";
import { ShopifyOrder } from "../models/ShopifyOrder";
import { PipelineStage } from "mongoose";

// get all orders
export const getOrders = async (req: Request, res: Response) => {
	try {
		const orders = await ShopifyOrder.find();

		return res.status(200).send(orders);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Fetching Orders: ", error.message);
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

// Get total sales over time (daily, monthly, quarterly, yearly)
export const getTotalSalesOverTime = async (req: Request, res: Response) => {
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

		const sales = await ShopifyOrder.aggregate([
			{
				$project: {
					created_at: {
						$dateFromString: { dateString: "$created_at" },
					},
					total_price: {
						$toDouble: "$total_price_set.shop_money.amount",
					},
				},
			},
			{
				$group: {
					_id: groupBy[interval],
					totalSales: { $sum: "$total_price" },
				},
			},
			{
				$project: {
					_id: 0,
					time: "$_id",
					totalSales: 1,
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
		]);

		return res.status(200).send({
			success: true,
			data: sales,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Fetching Total Sales: ", error.message);
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

export const getSalesGrowthRate = async (req: Request, res: Response) => {
	try {
		const interval = req.query.interval as string; // Cast query parameter to string

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
				quarter: {
					$ceil: { $divide: [{ $month: "$created_at" }, 3] },
				},
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

		// Growth Rates Pipeline
		const growthRatesPipeline: PipelineStage[] = [
			{
				$project: {
					created_at: {
						$dateFromString: { dateString: "$created_at" }, // Convert string to Date
					},
					total_price: {
						$toDouble: "$total_price_set.shop_money.amount",
					}, // Convert string to number
				},
			},
			{
				$group: {
					_id: groupBy[interval],
					totalSales: { $sum: "$total_price" },
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
			{
				$group: {
					_id: null,
					sales: { $push: "$$ROOT" }, // Push all periods' sales into an array
				},
			},
			{
				$project: {
					_id: 0,
					growthRates: {
						$map: {
							input: { $range: [1, { $size: "$sales" }] },
							as: "index",
							in: {
								$let: {
									vars: {
										current: {
											$arrayElemAt: ["$sales", "$$index"],
										},
										previous: {
											$arrayElemAt: [
												"$sales",
												{
													$subtract: ["$$index", 1],
												},
											],
										},
									},
									in: {
										time: "$$current._id",
										growthRate: {
											$cond: [
												{
													$gt: [
														"$$previous.totalSales",
														0,
													],
												},
												{
													$multiply: [
														{
															$divide: [
																{
																	$subtract: [
																		"$$current.totalSales",
																		"$$previous.totalSales",
																	],
																},
																"$$previous.totalSales",
															],
														},
														100,
													],
												},
												0,
											],
										},
									},
								},
							},
						},
					},
				},
			},
		];

		// Execute growth rates pipeline
		const growthRatesResult = await ShopifyOrder.aggregate(
			growthRatesPipeline
		);

		const growthRates = growthRatesResult[0]?.growthRates || [];
		
		return res.status(200).send({
			success: true,
			data: growthRates,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Fetching Sales Growth Rate: ", error.message);
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
