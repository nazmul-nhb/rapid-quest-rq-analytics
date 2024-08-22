import { model, Schema } from "mongoose";
import { IProductOption, IProductVariant, ProductDocument } from "../types/models";

// Option Schema
const ProductOptionSchema = new Schema<IProductOption>({
  id: { type: String, required: true },
  product_id: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: Number, required: true },
  values: { type: [String], required: true },
});

// Variant Schema
const ProductVariantSchema = new Schema<IProductVariant>({
  id: { type: String, required: true },
  product_id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String, required: true },
  position: { type: Number, required: true },
  inventory_policy: { type: String, required: true },
  compare_at_price: { type: Number, default: null },
  fulfillment_service: { type: String, required: true },
  inventory_management: { type: String, default: null },
  option1: { type: String, required: true },
  option2: { type: String, default: null },
  option3: { type: String, default: null },
  created_at: { type: String, default: "" },
  updated_at: { type: String, default: "" },
  taxable: { type: Boolean, required: true },
  barcode: { type: String, default: null },
  grams: { type: Number, required: true },
  weight: { type: Number, required: true },
  weight_unit: { type: String, required: true },
  inventory_item_id: { type: String, required: true },
  inventory_quantity: { type: Number, required: true },
  old_inventory_quantity: { type: Number, required: true },
  requires_shipping: { type: Boolean, required: true },
  admin_graphql_api_id: { type: String, required: true },
  image_id: { type: String, default: null },
});

// Product Schema
const ProductSchema = new Schema<ProductDocument>({
  _id: { type: String, required: true },
  admin_graphql_api_id: { type: String, required: true },
  body_html: { type: String, default: null },
  created_at: { type: Date, required: true },
  handle: { type: String, required: true },
  id: { type: String, required: true },
  image: { type: String, default: null },
  images: { type: [String], default: [] },
  options: { type: [ProductOptionSchema], required: true },
  product_type: { type: String, required: true },
  published_at: { type: Date, default: null },
  published_scope: { type: String, required: true },
  status: { type: String, required: true },
  tags: { type: String, default: "" },
  template_suffix: { type: String, default: null },
  title: { type: String, required: true },
  updated_at: { type: Date, required: true },
  variants: { type: [ProductVariantSchema], required: true },
  vendor: { type: String, required: true },
});

// Exporting the ShopifyProduct model
export const ShopifyProduct = model<ProductDocument>(
  "ShopifyProduct",
  ProductSchema,
  "shopifyProducts"
);
