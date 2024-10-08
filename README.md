# Live Bidding Application

## Overview
This is a live bidding application built with Node.js, Express, and MySQL, using WebSockets for real-time bidding functionality. Bidders can join an auction, place bids, and view the current highest bid in real-time. The application also integrates Redis for caching the highest bid to improve performance.

## Features
- Real-time bidding with WebSocket support.
- User authentication (registration and login).
- Auction creation with a specified end time and starting price.
- Bidding history and current highest bid display.
- Caching of highest bids using Redis.
- MySQL database for persistent storage of auctions, bids, and users.

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Caching**: Redis (optional)
- **Real-time Communication**: WebSockets (using the `ws` library)
- **ORM**: Sequelize
- **Testing**: Mocha and Chai

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (or a MySQL server)
- [Redis](https://redis.io/) (optional, for caching)

### Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/live-bidding-app.git
   cd live-bidding-app

2. Install dependencies:
    npm install

3. Create a .env file in the root directory with the following content:
    PORT=3000
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=root
    MYSQL_DATABASE=auction_db

    REDIS_HOST=localhost
    REDIS_PORT=6379

    Replace the values with your own MySQL and Redis configurations.

4. Create the MySQL database:
    Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin) and run:

    CREATE DATABASE auction_db;

5. (Optional) If using Redis, make sure the Redis server is running. You can run it using:
    redis-server


Running the Application

1. Start the application:
    npm start

2. Access the application in your browser at:
    http://localhost:3000


Running Tests

To run the tests, execute the following command:
    npm test


Project Structure

live-bidding-app/
├── config/
│   ├── sequelize.js
├── models/
│   ├── auction.js
│   ├── bid.js
│   ├── user.js
├── public/
│   ├── index.html
│   ├── style.css
├── routes/
│   ├── auction.js
│   ├── bid.js
│   ├── user.js
├── tests/
│   ├── auction.test.js
│   ├── bid.test.js
│   ├── user.test.js
├── .env
├── package.json
└── server.js
