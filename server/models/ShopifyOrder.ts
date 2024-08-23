import { Schema, model } from "mongoose";
import {
	ILineItem,
	IMoney,
	IMoneySet,
	OrderDocument,
} from "../types/models";
import { CustomerAddressSchema, CustomerSchema } from "./ShopifyCustomer";

// Money Schema
const MoneySchema = new Schema<IMoney>({
	amount: { type: Schema.Types.Mixed, required: true },
	currency_code: { type: String, required: true },
});

// Money Set Schema
const MoneySetSchema = new Schema<IMoneySet>({
	shop_money: { type: MoneySchema, required: true },
	presentment_money: { type: MoneySchema, required: true },
});

// Line Item Schema
const LineItemSchema = new Schema<ILineItem>({
	id: { type: String, required: true },
	variant_id: { type: String, required: true },
	title: { type: String, required: true },
	quantity: { type: Number, required: true },
	sku: { type: String, default: "" },
	variant_title: { type: String, required: true },
	vendor: { type: String, required: true },
	fulfillment_service: { type: String, required: true },
	product_id: { type: String, required: true },
	requires_shipping: { type: Boolean, required: true },
	taxable: { type: Boolean, required: true },
	gift_card: { type: Boolean, required: true },
	name: { type: String, required: true },
	variant_inventory_management: { type: String, required: true },
	properties: { type: [], default: [] },
	product_exists: { type: Boolean, required: true },
	fulfillable_quantity: { type: Number, required: true },
	grams: { type: Number, required: true },
	price: { type: Number, required: true },
	total_discount: { type: String, required: true },
	fulfillment_status: { type: String, default: null },
	price_set: { type: MoneySetSchema, required: true },
	total_discount_set: { type: MoneySetSchema, required: true },
	discount_allocations: { type: [], default: [] },
	duties: { type: [], default: [] },
	admin_graphql_api_id: { type: String, required: true },
});

// Order Schema
const OrderSchema = new Schema<OrderDocument>({
	_id: { type: String, required: true },
	email: { type: String, required: true },
	closed_at: { type: String, default: null },
	created_at: { type: String, required: true },
	updated_at: { type: String, required: true },
	number: { type: Number, required: true },
	note: { type: String, default: null },
	token: { type: String, required: true },
	gateway: { type: String, required: true },
	test: { type: Boolean, required: true },
	total_price: { type: String, required: true },
	subtotal_price: { type: String, required: true },
	total_weight: { type: Number, required: true },
	total_tax: { type: String, required: true },
	taxes_included: { type: Boolean, required: true },
	currency: { type: String, required: true },
	financial_status: { type: String, required: true },
	confirmed: { type: Boolean, required: true },
	total_discounts: { type: String, required: true },
	buyer_accepts_marketing: { type: Boolean, required: true },
	name: { type: String, required: true },
	referring_site: { type: String, default: null },
	landing_site: { type: String, default: null },
	cancelled_at: { type: String, default: null },
	cancel_reason: { type: String, default: null },
	reference: { type: String, default: null },
	user_id: { type: String, default: null },
	location_id: { type: String, default: null },
	source_identifier: { type: String, default: null },
	source_url: { type: String, default: null },
	device_id: { type: String, default: null },
	phone: { type: String, default: null },
	customer_locale: { type: String, required: true },
	app_id: { type: Number, required: true },
	browser_ip: { type: String, required: true },
	landing_site_ref: { type: String, default: null },
	order_number: { type: String, required: true },
	discount_applications: { type: [], default: [] },
	discount_codes: { type: [], default: [] },
	note_attributes: { type: [], default: [] },
	payment_gateway_names: { type: [String], required: true },
	processing_method: { type: String, required: true },
	source_name: { type: String, required: true },
	fulfillment_status: { type: String, default: null },
	tax_lines: { type: [], default: [] },
	tags: { type: String, default: "" },
	contact_email: { type: String, default: null },
	order_status_url: { type: String, required: true },
	presentment_currency: { type: String, required: true },
	total_line_items_price_set: { type: MoneySetSchema, required: true },
	total_discounts_set: { type: MoneySetSchema, required: true },
	total_shipping_price_set: { type: MoneySetSchema, required: true },
	subtotal_price_set: { type: MoneySetSchema, required: true },
	total_price_set: { type: MoneySetSchema, required: true },
	total_tax_set: { type: MoneySetSchema, required: true },
	line_items: { type: [LineItemSchema], required: true },
	shipping_lines: { type: [], default: [] },
	billing_address: { type: CustomerAddressSchema, default: null },
	shipping_address: { type: CustomerAddressSchema, default: null },
	fulfillments: { type: [], default: [] },
	client_details: { type: Schema.Types.Mixed, default: {} },
	refunds: { type: [], default: [] },
	customer: { type: CustomerSchema, required: true },
	total_line_items_price: { type: String, required: true },
});

export const ShopifyOrder = model<OrderDocument>(
	"ShopifyOrder",
	OrderSchema,
	"shopifyOrders"
);
