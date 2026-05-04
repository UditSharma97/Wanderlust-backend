# Wanderlust

A full-stack web application for browsing and managing travel listings, built with Node.js, Express, MongoDB, and EJS.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)

---

## About

Wanderlust is a travel listing platform inspired by Airbnb. It allows users to browse, create, update, and delete listings. The project follows MVC architecture with RESTful routing and a Bootstrap-based responsive UI.

---

## Features

- Full CRUD operations for travel listings
- Persistent data storage with MongoDB and Mongoose
- Database seeding for development and testing
- Server-side rendering with EJS templates and reusable partials
- Responsive UI built with Bootstrap

---

## Tech Stack

| Layer      | Technology  |
|------------|-------------|
| Runtime    | Node.js     |
| Framework  | Express.js  |
| Database   | MongoDB     |
| ODM        | Mongoose    |
| Templating | EJS         |
| Styling    | Bootstrap 5 |

---

## Project Structure

```
wanderlust-backend/
├── models/
│   └── listing.js          # Mongoose schema and model
├── views/
│   ├── listings/
│   │   ├── index.ejs       # All listings
│   │   ├── show.ejs        # Single listing
│   │   ├── new.ejs         # Create listing form
│   │   └── edit.ejs        # Edit listing form
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── public/
│   ├── css/
│   └── js/
├── init/
│   └── data.js             # Seed data
├── app.js
├── package.json
└── .env
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/UditSharma97/Wanderlust-backend.git
   cd Wanderlust-backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory

   ```env
   MONGO_URL=mongodb://localhost:27017/wanderlust
   PORT=3000
   ```

4. Start the server

   ```bash
   node app.js
   ```

   The app will be available at `http://localhost:3000`.

### Database Seeding

To populate the database with sample listings:

```bash
node init/data.js
```

> Note: This will overwrite any existing listings in the database.

---

## API Routes

| Method | Route               | Description              |
|--------|---------------------|--------------------------|
| GET    | /listings           | View all listings        |
| GET    | /listings/new       | New listing form         |
| POST   | /listings           | Create a listing         |
| GET    | /listings/:id       | View a single listing    |
| GET    | /listings/:id/edit  | Edit listing form        |
| PUT    | /listings/:id       | Update a listing         |
| DELETE | /listings/:id       | Delete a listing         |

---

## Environment Variables

| Variable  | Description               | Example                                |
|-----------|---------------------------|----------------------------------------|
| MONGO_URL | MongoDB connection string | mongodb://localhost:27017/wanderlust   |
| PORT      | Server port               | 3000                                   |

---

## Future Scope

- [ ] User authentication (register, login, logout)
- [ ] Reviews and ratings
- [ ] Map integration with Mapbox
- [ ] Image uploads via Cloudinary
- [ ] Deployment

---

## License

This project is open source and available under the [MIT License](LICENSE).
