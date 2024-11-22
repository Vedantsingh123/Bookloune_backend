# BookLounge Backend

The **BookLounge Backend** is the server-side part of the **BookLounge** project, a full-stack online book purchasing platform. Built using **Node.js**, **Express.js**, and **MongoDB**, it provides a RESTful API that supports user authentication, book management, order processing, and profile management. The backend is designed to work seamlessly with the **frontend**, which is built using **React.js**.

**BookLounge** allows users to browse books, add books to their cart and favorites, and place orders. Admin users have the ability to manage the books, while regular users can update their profiles and view their order history.

## Features

- **User Authentication**: Secure sign-up and login with **JWT** (JSON Web Tokens).
- **Book Management**: Admins can add, update, and delete books.
- **Cart and Favorites**: Users can add books to their cart, mark books as favorites, and purchase them.
- **Order Management**: Users can place orders and track their order history.
- **User Profile**: Users can update their username, email, and address.
- **Secure Passwords**: Passwords are hashed using **bcryptjs** for secure storage.
- **Responsive API**: Built for scalability with a RESTful approach to handle various operations efficiently.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data, books, and orders.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for user authentication and authorization.
- **bcryptjs**: Library to hash and verify passwords securely.
- **dotenv**: Manages environment variables like DB connection strings and JWT secret keys.
- **Cors**: Enables cross-origin resource sharing for frontend-backend communication.
- **Nodemon**: Automatically restarts the server during development.

## Frontend Repository

The Frontend for this project is hosted in a separate repository. You can find it here:

[**BookLounge Frontend Repository**](https://github.com/Vedantsingh123/Booklounge_frontend)


## Installation

To set up **BookLounge Backend** locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/booklounge-backend.git
cd booklounge-backend
