import express, { Router } from "express";
import { getOrders } from "../controllers/orderControllers";

const router: Router = express.Router();

// get shopify orders
router.get("/", getOrders);

export default router;
