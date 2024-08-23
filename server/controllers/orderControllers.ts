import express, { Request, Response } from "express";
import { ShopifyOrder } from "../models/ShopifyOrder";

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
