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

