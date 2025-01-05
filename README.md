# orbit_backend
# Orbit Wallet assignment

## Overview
This repository contains a Node.js application that implements APIs to fetch user details and transaction data. The application uses MongoDB for storing data, and the APIs are designed according to the given requirements.

## Project Structure
The project is built using the following technologies:
- **Node.js**: JavaScript runtime to build the backend application.
- **Express.js**: Web framework for routing and handling HTTP requests.
- **MongoDB**: NoSQL database used to store user and transaction data.
- **MongoDB Atlas**: Cloud-based MongoDB service for database deployment.

## API Endpoints

### 1. Get User Details by ID
- **Endpoint**: `GET /api/users/:id`
- **Description**: Fetch user details by user ID.
- **Response**:
    ```json
    {
      "id": "user_id",
      "name": "User Name",
      "phoneNumber": "1234567890"
    }
    ```

### 2. Get All Transactions for a User by User ID
- **Endpoint**: `GET /api/transactions/user/:id`
- **Query Parameters**:
  - `status`: (optional) Filter by transaction status (`success`, `pending`, `failed`).
  - `from`: (optional) Start date of the date range (in `YYYY-MM-DD` format).
  - `to`: (optional) End date of the date range (in `YYYY-MM-DD` format).
  - `type`: (optional) Filter by transaction type (`debit`, `credit`).
- **Description**: Fetch all transactions for a user with filters for status, date range, and type.
- **Response**:
    ```json
    [
      {
        "id": "transaction_id",
        "status": "success",
        "type": "credit",
        "transactionDate": "2025-01-01",
        "amount": 100,
        "userId": "user_id"
      },
      ...
    ]
    ```

### 3. Get All Transactions with User Details
- **Endpoint**: `GET /api/transactions`
- **Query Parameters**:
  - `status`: (optional) Filter by transaction status (`success`, `pending`, `failed`).
  - `from`: (optional) Start date of the date range (in `YYYY-MM-DD` format).
  - `to`: (optional) End date of the date range (in `YYYY-MM-DD` format).
  - `type`: (optional) Filter by transaction type (`debit`, `credit`).
- **Description**: Fetch all transactions with user details based on the filters provided.
- **Response**:
    ```json
    [
      {
        "transactionId": "transaction_id",
        "status": "success",
        "type": "credit",
        "transactionDate": "2025-01-01",
        "amount": 100,
        "user": {
          "id": "user_id",
          "name": "User Name",
          "phoneNumber": "1234567890"
        }
      },
      ...
    ]
    ```

## MongoDB Database Structure

### Users Collection
- **id** (primary key, automatically generated by MongoDB as `_id`)
- **name**: User's full name.
- **phoneNumber**: User's phone number.

### Transactions Collection
- **id** (primary key, automatically generated by MongoDB as `_id`)
- **status**: Status of the transaction (`success`, `pending`, `failed`).
- **type**: Type of transaction (`debit`, `credit`).
- **transactionDate**: Date the transaction occurred.
- **amount**: Amount of the transaction.
- **userId**: Foreign key linking to the `Users` collection.

## Setup Instructions

### Prerequisites
Before running the project, make sure you have the following installed:
- **Node.js** (v14.x or above)
- **MongoDB** (using MongoDB Atlas or a local MongoDB setup)

Server is live at https://orbit-backend-seu8.onrender.com

### Steps to Set Up the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/backend-assignment.git
2. Navigate to the repository:

   ```bash
   cd orbi_backend

3. Install dependencies:

   ```bash
   npm i
4. Set up environment variables for MongoDB connection: Create a .env file in the root directory and add your MongoDB connection string:

   ```bash
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-database

5. Populate random data (10 users and 5 transactions per user): Run the script to insert random data into MongoDB:

   ```bash
   node populate.js

6. Run the server:

   ```bash
   npm run start
