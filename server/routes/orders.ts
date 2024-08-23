import express, { Router } from "express";
import { getOrders, getTotalSalesOverTime } from "../controllers/orderControllers";

const router: Router = express.Router();

// get shopify orders
router.get("/", getOrders);

// get sales over time
router.get("/sales-over-time", getTotalSalesOverTime);

export default router;
