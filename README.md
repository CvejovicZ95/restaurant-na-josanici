# Restaraunt "Na Josanici"

## Project Overview

Project involves creating a website for a restaurant with accommodation, allowing users to easily reserve rooms or submit inquiries. The site also provides a management interface for the manager to update offerings, manage reservations, and handle messages efficiently.

## Features

- **Authentication:**
  - For authentication, Json Web Tokens (JWT) are used.
  - JWT is saved in local storage and sent on request where necessary.
- **Users:**
  - Create Reservations
  - Send Query
  
- **Owner/Manager:**
  - Log in
  - Logout
  - Manage Reservation (delete, processed)
  - Manage Querys (delete)
  - Manage Menu(add, delete, update)
  - Manage Rooms(price, info)

## Technologies Used

- React.js
- JavaScript
- Node.js
- Express.js
- MongoDB
- CSS3

## Environment Variables (Server Folder)

- `DATABASE`: MongoDB connection string  
- `PORT`: Port (e.g., 4500)

## Environment Variables (Client Folder(config.json))

## Start Scripts

- **Server:**
  - `nodemon server`
- **Client:**
  - `npm start`
