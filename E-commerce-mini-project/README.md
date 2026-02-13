# Mini Project – E-commerce Backend API

## Overview
This project is a simple E-commerce backend API built using Node.js, Express, and MongoDB Atlas.
It allows users to view products, add items to a cart, and place orders.

The project follows REST principles and uses MongoDB for data persistence.
All endpoints are tested using Postman.

---

## Features
- Product management (CRUD)
- Cart management
- Order creation from cart
- Input validation and error handling
- MongoDB Atlas integration
- Tested via Postman


## Project Structure
E-commerce-mini-project/
       config/
       controllers/
       models/
       routes/
       server.js
       package.json
       E-commerce backend - mini project.postman_collection
       README.md

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman

MONGO_URI=<your MongoDB Atlas connection string>(mongodb+srv://...)
PORT=5000

## How to Run
1. Install dependencies:
  ``npm install``
3. Start the server:
    ``npm start``
# API Endpoints
Products

  GET /products
  
  GET /products/:id
  
  POST /products
  
  PUT /products/:id
  
  DELETE /products/:id
Cart

  GET /cart
  
  POST /cart
  
  PUT /cart
  
  DELETE /cart/:productId
  
Orders

  POST /orders
  
  GET /orders
  
  GET /orders/:id
  
-All endpoints are tested using Postman

-The Postman collection is included as E-commerce backend - mini project.postman_collection  
