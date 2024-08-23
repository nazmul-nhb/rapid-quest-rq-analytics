import express, { Router } from "express";
import { getProducts } from "../controllers/productControllers";

const router: Router = express.Router();

// get shopify products
router.get("/", getProducts);

export default router;
