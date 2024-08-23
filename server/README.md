# API Documentation

This API provides access to customer, product, and order data with several analytical endpoints.

## Base URL

- [Base URL](https://rapid-quest-rq-analytics-server.vercel.app)

All endpoints are prefixed with the following routes:

- `/customers`
- `/products`
- `/orders`

---

## Customers API

### 1. Get All Customers

**Endpoint:** `GET /customers`  
**Description:** Fetches all customer data.

---

### 2. Get New Customers Over Time

**Endpoint:** `GET /customers/new-customers`  
**Description:** Retrieves customer data for newly acquired customers over a given period.  
**Query Parameters:**

- **`interval`**: Specifies the time interval for grouping results. Options: `daily`, `monthly`, `quarterly`, `yearly`.  
  **Example:** `/customers/new-customers?interval=monthly`

---

### 3. Get Repeat Customers

**Endpoint:** `GET /customers/repeat-customers`  
**Description:** Fetches data of customers who have made more than one purchase.  
**Query Parameters:**

- **`interval`**: Specifies the time interval for grouping results. Options: `daily`, `monthly`, `quarterly`, `yearly`.  
  **Example:** `/customers/repeat-customers?interval=yearly`

---

### 4. Get Customer Geographical Distribution

**Endpoint:** `GET /customers/city-distribution`  
**Description:** Retrieves the distribution of customers across different cities or geographical areas.

---

## Products API

### 1. Get Shopify Products

**Endpoint:** `GET /products`  
**Description:** Retrieves the list of all products available in the store.

---

## Orders API

### 1. Get Shopify Orders

**Endpoint:** `GET /orders`  
**Description:** Fetches all order data from the store.

---

### 2. Get Total Sales Over Time

**Endpoint:** `GET /orders/sales-over-time`  
**Description:** Retrieves total sales figures over a specific time period.  
**Query Parameters:**

- **`interval`**: Specifies the time interval for grouping results. Options: `daily`, `monthly`, `quarterly`, `yearly`.  
  **Example:** `/orders/sales-over-time?interval=quarterly`

---

### 3. Get Sales Growth Rate

**Endpoint:** `GET /orders/sales-growth-rate`  
**Description:** Calculates and returns the growth rate of sales over time.  
**Query Parameters:**

- **`interval`**: Specifies the time interval for grouping results. Options: `daily`, `monthly`, `quarterly`, `yearly`.  
  **Example:** `/orders/sales-growth-rate?interval=daily`

---

### 4. Get Customer Lifetime Value

**Endpoint:** `GET /orders/lifetime-value`  
**Description:** Retrieves the average customer lifetime value (CLTV) for customers.

---
