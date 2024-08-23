import { Request, Response } from "express";
import { ShopifyProduct } from "../models/ShopifyProduct";

// get all products
export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await ShopifyProduct.find(
			{},
			{
				title: 1,
				handle: 1,
				product_type: 1,
				vendor: 1,
				created_at: 1,
				updated_at: 1,
				status: 1,
				tags: 1,
				variants: {
					id: 1,
					title: 1,
					price: 1,
					sku: 1,
					inventory_quantity: 1,
					requires_shipping: 1,
					weight: 1,
					weight_unit: 1,
					inventory_item_id: 1,
				},
				options: {
					product_id: 1,
					id: 1,
					name: 1,
					values: 1,
				},
			}
		);

		const totalProducts = await ShopifyProduct.countDocuments();

		return res.status(200).send({
			success: true,
			totalProducts,
			products,
		});
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
