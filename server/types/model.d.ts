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

export interface IEmailMarketingConsent {
	state: string;
	opt_in_level: string;
	consent_updated_at: Date | null;
}

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
