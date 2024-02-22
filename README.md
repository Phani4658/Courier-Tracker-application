# Courier Tracking System

This is a web-based courier tracking system developed using the MERN (MongoDB, Express, React, Node) stack. The system allows users to track courier packages and provides an admin panel for managing courier tracking data.

## Live Deployment

The project is deployed live at: [Courier Tracking System](https://courier-tracker-bice.vercel.app/)

## Demo Credentials

### Admin
- Username: admin
- Password: admin123

### User
- Username: user
- Password: user123

## Features

- **User Interface**: Provides a user-friendly interface for tracking courier packages.
- **Authentication**: Implements a simple authentication mechanism for tracking updates.
- **Admin Panel**: Includes an admin panel for managing courier tracking data.
- **CRUD Operations**: Allows administrators to perform CRUD operations on courier tracking data.
- **RESTful API**: Implements a RESTful API for handling package tracking data.

## Technologies Used

- **Frontend**:

  - React
  - React Router dom for routing
  - CSS for styling

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB Atlas for database

## Installation and Setup

1. Clone the repository:

```
git clone git@github.com:Phani4658/Courier-Tracker-application.git
```

2. Install dependencies:

```
cd courier-tracking-system/backend
npm install
```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add environment variables such as `DB_URI` for MongoDB connection, `JWT_SECRET` for JWT token, etc.

4. Run the development server:

```
nodemon index
```

5. In another terminal:

```
cd courier-tracking-system/frontend
npm install
```

6. Run the frontend:

```
npm run dev
```

7. Open your browser and visit `http://localhost:3000` to access the application.

## Usage

- **User Interface**:

  - Visit the homepage to track a courier package by entering its tracking number.
  - View the tracking information, including the package's current status and location.

- **Admin Panel**:
  - Access the admin panel by logging in as an administrator.
  - Add, update, or delete tracking information as required.

## API Endpoints

- **POST /register**: Register a new user.
- **POST /login**: User login.
- **POST /admin/login**: Admin login.
- **POST /couriers**: Create a new courier.
- **GET /couriers**: Get all couriers.
- **GET /admin/couriers/:id**: Get courier by ID.
- **GET /couriers/:trackingNumber**: Get courier by tracking number.
- **PUT /couriers/:id**: Update courier by ID.
- **DELETE /couriers/:id**: Delete courier by ID.
