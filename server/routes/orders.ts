import express, { Router } from "express";
import {
	getCustomerLifetimeValue,
	getOrders,
	getSalesGrowthRate,
	getTotalSalesOverTime,
} from "../controllers/orderControllers";

const router: Router = express.Router();

// get shopify orders
router.get("/", getOrders);

// get sales over time
router.get("/sales-over-time", getTotalSalesOverTime);

// get sales over time
router.get("/sales-growth-rate", getSalesGrowthRate);

// get sales over time
router.get("/lifetime-value", getCustomerLifetimeValue);

export default router;
