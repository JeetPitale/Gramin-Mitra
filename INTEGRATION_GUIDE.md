# Gramin Mitra - Farmer & Wholesaler Integration

## Overview
Successfully connected farmers and wholesalers through a real-time backend API system where:
- **Farmers** can add products to their inventory
- **Wholesalers** can browse products by category and place orders
- **Orders** are tracked in real-time and visible to both parties

## Backend API Endpoints

### Products
- `GET /products` - Get all products from all farmers
- `GET /products/farmer/:farmerId` - Get products for a specific farmer
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Orders
- `POST /orders` - Create a new order
- `GET /orders/farmer/:farmerId` - Get orders for a farmer
- `GET /orders/wholesaler/:wholesalerId` - Get orders for a wholesaler
- `GET /orders` - Get all orders
- `PATCH /orders/:id/status` - Update order status

## Frontend Integration

### Farmer Dashboard
- **Products Management**: Fetches and displays farmer's inventory from MongoDB
- **Add/Delete Products**: Real-time CRUD operations via API
- **Order Tracking**: Displays incoming orders from wholesalers
- **Home Button**: Navigate back to landing page

### Wholesale Dashboard  
- **Browse by Category**: View products filtered by type (Vegetable, Fruit, Grain, Pulse)
- **Product Listings**: Shows real products from all farmers
- **Place Orders**: Create purchase orders that appear in farmer's dashboard
- **No Home Button**: As requested, wholesalers stay in dashboard

## How It Works

### Flow for Farmers:
1. Login as a farmer
2. Click "Add New Crop" to list products
3. Products are saved to MongoDB
4. When a wholesaler orders, it appears in "Recent Orders" table

### Flow for Wholesalers:
1. Login as a wholesaler
2. Click on a category (Vegetable, Fruit, Grain, or Pulse)
3. Browse real products listed by farmers
4. Click "Buy Stock" on any product
5. Enter quantity and select delivery type
6. Order is created and sent to the farmer

## Database Models

### Product
- farmerId, farmerName, name, type, quantity, price, image

### Order
- farmerId, farmerName, wholesalerId, wholesalerName
- cropName, quantity, unit, pricePerUnit, totalPrice
- deliveryType, status, location

## Features
✅ Real-time data synchronization
✅ MongoDB integration
✅ Role-based dashboards
✅ Order tracking system
✅ Category-based filtering
✅ Responsive UI
