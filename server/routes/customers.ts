import express, { Router } from "express";
import { getCustomers, getNewCustomersOverTime, getRepeatCustomers } from "../controllers/customerControllers";

const router: Router = express.Router();

// get shopify customers
router.get("/", getCustomers);

// get shopify customers
router.get("/new-customers", getNewCustomersOverTime);

// get repeat customers
router.get("/repeat-customers", getRepeatCustomers);

export default router;
