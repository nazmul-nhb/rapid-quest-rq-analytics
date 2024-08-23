import { Document } from "mongoose";

// Interface for customer address
export interface ICustomerAddress {
	id: string;
	customer_id: string;
	first_name: string;
	last_name: string;
	company: string | null;
	address1: string;
	address2: string | null;
	city: string;
	province: string;
	country: string;
	zip: string;
	phone: string | null;
	name: string;
	province_code: string | null;
	country_code: string;
	country_name: string;
	default: boolean;
}

// Interface for email marketing consent
export interface IEmailMarketingConsent {
	state: string;
	opt_in_level: string;
	consent_updated_at: Date | null;
}

// Interface for customer
export interface ICustomer {
	_id: string;
	addresses: ICustomerAddress[];
	admin_graphql_api_id: string;
	created_at: Date;
	currency: string;
	default_address: ICustomerAddress;
	email: string;
	email_marketing_consent: IEmailMarketingConsent;
	first_name: string;
	last_name: string;
	last_order_id: string | null;
	last_order_name: string | null;
	multipass_identifier: string | null;
	note: string | null;
	orders_count: number;
	phone: string | null;
	sms_marketing_consent: unknown | null;
	state: string;
	tags: string;
	tax_exempt: boolean;
	tax_exemptions: string[];
	total_spent: string;
	updated_at: Date;
	verified_email: boolean;
}

// Customer Type for Mongoose Model
export type CustomerDocument = ICustomer & Document;

// Interface for Product Option
export interface IProductOption {
	id: string;
	product_id: string;
	name: string;
	position: number;
	values: string[];
}

// Interface for Product Variant
export interface IProductVariant {
	id: string;
	product_id: string;
	title: string;
	price: number;
	sku: string;
	position: number;
	inventory_policy: string;
	compare_at_price: number | null;
	fulfillment_service: string;
	inventory_management: string | null;
	option1: string;
	option2: string | null;
	option3: string | null;
	created_at: string;
	updated_at: string;
	taxable: boolean;
	barcode: string | null;
	grams: number;
	weight: number;
	weight_unit: string;
	inventory_item_id: string;
	inventory_quantity: number;
	old_inventory_quantity: number;
	requires_shipping: boolean;
	admin_graphql_api_id: string;
	image_id: string | null;
}

// Interface for Product
export interface IProduct {
	_id: string;
	admin_graphql_api_id: string;
	body_html: string | null;
	created_at: Date;
	handle: string;
	id: string;
	image: string | null;
	images: string[];
	options: IProductOption[];
	product_type: string;
	published_at: Date | null;
	published_scope: string;
	status: string;
	tags: string;
	template_suffix: string | null;
	title: string;
	updated_at: Date;
	variants: IProductVariant[];
	vendor: string;
}

// Product Type for Mongoose Model
export type ProductDocument = IProduct & Document;

// Types and interfaces for money-related fields
export interface IMoney {
	amount: string | number;
	currency_code: string;
}

export interface IMoneySet {
	shop_money: IMoney;
	presentment_money: IMoney;
}

// Types for Order Line Items
export interface ILineItem {
	id: string;
	variant_id: string;
	title: string;
	quantity: number;
	sku: string;
	variant_title: string;
	vendor: string;
	fulfillment_service: string;
	product_id: string;
	requires_shipping: boolean;
	taxable: boolean;
	gift_card: boolean;
	name: string;
	variant_inventory_management: string;
	properties: any[];
	product_exists: boolean;
	fulfillable_quantity: number;
	grams: number;
	price: number;
	total_discount: string;
	fulfillment_status: string | null;
	price_set: IMoneySet;
	total_discount_set: IMoneySet;
	discount_allocations: any[];
	duties: any[];
	admin_graphql_api_id: string;
}

// Main Order Interface
export interface IOrder {
	_id: string;
	email: string;
	closed_at: string | null;
	created_at: string;
	updated_at: string;
	number: number;
	note: string | null;
	token: string;
	gateway: string;
	test: boolean;
	total_price: string;
	subtotal_price: string;
	total_weight: number;
	total_tax: string;
	taxes_included: boolean;
	currency: string;
	financial_status: string;
	confirmed: boolean;
	total_discounts: string;
	buyer_accepts_marketing: boolean;
	name: string;
	referring_site: string | null;
	landing_site: string | null;
	cancelled_at: string | null;
	cancel_reason: string | null;
	reference: string | null;
	user_id: string | null;
	location_id: string | null;
	source_identifier: string | null;
	source_url: string | null;
	device_id: string | null;
	phone: string | null;
	customer_locale: string;
	app_id: number;
	browser_ip: string;
	landing_site_ref: string | null;
	order_number: string;
	discount_applications: any[];
	discount_codes: any[];
	note_attributes: any[];
	payment_gateway_names: string[];
	processing_method: string;
	source_name: string;
	fulfillment_status: string | null;
	tax_lines: any[];
	tags: string;
	contact_email: string | null;
	order_status_url: string;
	presentment_currency: string;
	total_line_items_price_set: IMoneySet;
	total_discounts_set: IMoneySet;
	total_shipping_price_set: IMoneySet;
	subtotal_price_set: IMoneySet;
	total_price_set: IMoneySet;
	total_tax_set: IMoneySet;
	line_items: ILineItem[];
	shipping_lines: any[];
	billing_address: ICustomerAddress | null;
	shipping_address: ICustomerAddress | null;
	fulfillments: any[];
	client_details: any;
	refunds: any[];
	customer: ICustomer;
	total_line_items_price: string;
}

// Order Type for Mongoose Model
export type OrderDocument = IOrder & Document;
