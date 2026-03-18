# SMART DEALS

A local online marketplace for buying, selling, and bidding.

---

## Overview

SMART DEALS allows users to:

- Post items for sale
- Place bids on items
- Negotiate prices through bidding
- Mark items as sold or pending

A simple community-based marketplace with a bidding system.

---

## Tech Stack

- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: Firebase
- API: REST

---

## Live Link: https://smart-deals-01.web.app 

## Database

### Products

- `_id` (ObjectId)
- `title` (String)
- `price_min` (Number)
- `price_max` (Number)
- `email` (String)
- `category` (String)
- `created_at` (Date)
- `image` (URL)
- `status` (pending / sold)
- `location` (String)
- `seller_image` (URL)
- `seller_name` (String)
- `condition` (fresh / used)
- `usage` (String)
- `description` (String)
- `seller_contact` (String)

### Bids

- `_id` (ObjectId)
- `product` (ObjectId)
- `buyer_image` (URL)
- `buyer_name` (String)
- `buyer_contact` (String)
- `buyer_email` (String)
- `bid_price` (Number)
- `status` (pending / confirmed)

---

## API

### Products

- `GET /products` (optional: filter by email)
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `PATCH /products/status/:text`

### Bids

- `GET /bids/:email`
- `POST /bids`
- `DELETE /bids/:id`
- `DELETE /bids/product/:id`
- `PATCH /bids/status/:id`

---

## Pages

- Home
- Register
- Login
- All Products
- My Products
- My Bids
- Product Details
- Post Product
- Update Product
- Error Page

---

## Flow

1. Seller posts a product  
2. Buyers place bids  
3. Seller accepts one bid  
4. Product marked as sold  
5. Other bids removed  

---

## License

MIT

---

SMART DEALS  
Local buying and selling made simple.
