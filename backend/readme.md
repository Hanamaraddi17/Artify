# Artify Backend

This is the backend for the **Artify** platform, a system where users can upload and browse artworks. The backend provides RESTful API endpoints to handle user authentication, artwork uploads, and data retrieval. It is built with **Node.js**, **Express.js**, and **MySQL**, and it includes middleware for handling image uploads with **Multer**.

## Features

- **User Authentication**: Sign up and log in functionalities using JWT-based authentication.
- **Artwork Management**: Authenticated users can upload artwork with image, title, description, and price.
- **Image Uploads**: Images are uploaded using Multer and stored in the `uploads/` directory.
- **Database Integration**: Data is stored in MySQL, with tables for users and artworks.
  
## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **File Upload**: Multer
- **Authentication**: Custom JWT-based middleware

## Prerequisites

Before setting up the backend, ensure you have the following installed on your machine:

- Node.js (v12+)
- MySQL
- Git

## Installation

### 1. Clone the Repository

Clone this repository to your local machine:

```bash

git clone https://github.com/Hanamaraddi17/Artify
cd ./backend
```
### 2. Install Dependencies

Install the required Node.js packages by running:

```bash
npm install
```
### 3. Set up the Environment Variables
Create a .env file in the root directory with the following content:

```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=artify
JWT_SECRET=yourjwtsecret
```
### 4. Set up the Database
Create a MySQL database named artify:

```sql
  CREATE DATABASE artify;
  USE artify;
```
Run the following SQL queries to create the required tables:

To create artworks table :
```sql
CREATE TABLE artworks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    artist_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
To create users table : 
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('artist', 'buyer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 5. Run the Server
Start the server by running:

```bash
npm start
The server should be running on http://localhost:5000.
```
API Endpoints
Authentication
```text
POST /auth/signup - Sign up a new user
POST /auth/login - Log in a user and receive a JWT token
```
Artworks
```text
POST /artworks/uploadartwork - Upload new artwork (requires authentication)
GET /artworks - Retrieve all artworks
```
Middleware
>
- **Multer**: Handles image uploads. Images are stored in the /uploads directory and are associated with artwork records in the database.
- **Auth Middleware**: Protects routes to ensure that only authenticated users can upload artwork.
- **File Upload Handling**: The platform uses Multer to handle file uploads. The images are stored in the /uploads/ folder, and filenames are automatically generated with unique identifiers to avoid conflicts. The path to the image is stored in the database.

## Development Notes

#### 1. Running in Development Mode
Use nodemon for easier development and auto-restarting the server upon file changes:

```bash
npm install -g nodemon
nodemon server.js
```

#### 2. Testing the API

You can use tools like Postman or curl to interact with the API endpoints. For example, to upload an artwork, 
send a POST request with the required fields and an image file using Postman.

#### 3. Error Handling

Authentication errors return a 401 status.
Validation errors return a 400 status with detailed error messages.
Server errors (e.g., database issues) return a 500 status.





## Developed with 💻 and ☕ by [Reddy](https://github.com/Hanamaraddi17/).
