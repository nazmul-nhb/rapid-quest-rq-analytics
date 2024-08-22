import express, { Router } from "express";
import { getCustomers } from "../controllers/customerController";

const router: Router = express.Router();

router.get("/", getCustomers);

export default router;
