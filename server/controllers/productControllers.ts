import express, { Request, Response } from "express";
import { ShopifyProduct } from "../models/ShopifyProduct";

// get all products
export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await ShopifyProduct.find();

		return res.status(200).send(products);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error Fetching Products: ", error.message);
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
