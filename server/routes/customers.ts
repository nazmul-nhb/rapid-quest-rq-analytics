import express, { Router } from "express";
import { getCustomerDistribution, getCustomers, getNewCustomersOverTime, getRepeatCustomers } from "../controllers/customerControllers";

const router: Router = express.Router();

// get all customers
router.get("/", getCustomers);

// get shopify customers
router.get("/new-customers", getNewCustomersOverTime);

// get repeat customers
router.get("/repeat-customers", getRepeatCustomers);

// get customer geographical distribution 
router.get("/city-distribution", getCustomerDistribution);

export default router;
