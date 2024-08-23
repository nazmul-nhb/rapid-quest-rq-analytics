import express, { Router } from "express";
import { getCustomers, getNewCustomersOverTime } from "../controllers/customerControllers";

const router: Router = express.Router();

// get shopify customers
router.get("/", getCustomers);

// get shopify customers
router.get("/new-customers", getNewCustomersOverTime);

export default router;
