import { Document, Schema, model } from "mongoose";
import { CustomerDocument, ICustomerAddress, IEmailMarketingConsent } from "../types/models";

// Address Schema
export const CustomerAddressSchema = new Schema<ICustomerAddress>({
	id: { type: String, required: true },
	customer_id: { type: String, required: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	company: { type: String, default: null },
	address1: { type: String, required: true },
	address2: { type: String, default: null },
	city: { type: String, required: true },
	province: { type: String, required: true },
	country: { type: String, required: true },
	zip: { type: String, required: true },
	phone: { type: String, default: null },
	name: { type: String, default: "" },
	province_code: { type: String, default: null },
	country_code: { type: String, default: "" },
	country_name: { type: String, default: "" },
	default: { type: Boolean, required: true },
});

// Email Marketing Consent Schema
const EmailMarketingConsentSchema = new Schema<IEmailMarketingConsent>({
	state: { type: String, required: true },
	opt_in_level: { type: String, required: true },
	consent_updated_at: { type: Date, default: null },
});

// Customer Schema
export const CustomerSchema = new Schema<CustomerDocument>({
	_id: { type: String, required: true },
	addresses: { type: [CustomerAddressSchema], required: true },
	admin_graphql_api_id: { type: String, required: true },
	created_at: { type: Date, required: true },
	currency: { type: String, default: "" },
	default_address: { type: CustomerAddressSchema, required: true },
	email: { type: String, required: true },
	email_marketing_consent: {
		type: EmailMarketingConsentSchema,
		required: true,
	},
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	last_order_id: { type: String, default: null },
	last_order_name: { type: String, default: null },
	multipass_identifier: { type: String, default: null },
	note: { type: String, default: null },
	orders_count: { type: Number, required: true },
	phone: { type: String, default: null },
	sms_marketing_consent: { type: Schema.Types.Mixed, default: null }, // Unknown structure
	state: { type: String, required: true },
	tags: { type: String, default: "" },
	tax_exempt: { type: Boolean, required: true },
	tax_exemptions: { type: [String], default: [] },
	total_spent: { type: String, required: true },
	updated_at: { type: Date, required: true },
	verified_email: { type: Boolean, required: true },
});

export const ShopifyCustomer = model<CustomerDocument>(
	"ShopifyCustomer",
	CustomerSchema,
	"shopifyCustomers"
);
