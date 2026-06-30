# Wanderlust

A full-stack, server-rendered travel accommodation listing and management web application built with Node.js, Express, MongoDB, and EJS, following the MVC architectural pattern.

Live deployment: Node.js/Express server hosted on Render, MongoDB database hosted on MongoDB Atlas.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Security](#security)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## About

Wanderlust allows users to browse property listings, create and manage their own listings, and submit and delete reviews, with secure authentication handled via Passport.js. The application follows the MVC pattern, separating routes, controllers, models, and views for maintainability, and includes ownership-based authorization so only a listing's owner can edit or delete it.

---

## Features

- Full CRUD for travel listings
- User registration, login, and logout via Passport.js (Local Strategy)
- Ownership-based authorization (`isOwner`, `isLoggedIn` middleware)
- Review creation and deletion, with cascade delete of reviews when a listing is removed
- Server-side schema validation using Joi
- Session management with `express-session` and `connect-mongo` (sessions persisted to MongoDB Atlas)
- Flash messages for success/error feedback (`connect-flash`)
- Centralized error handling via a custom `ExpressError` class and `wrapAsync` higher-order function
- Responsive UI built with Bootstrap and EJS layouts (`ejs-mate`)
- PUT/DELETE support in HTML forms via `method-override`

---

## Tech Stack

| Layer          | Technology                              |
|----------------|------------------------------------------|
| Runtime        | Node.js                                   |
| Framework      | Express.js                                |
| Database       | MongoDB (MongoDB Atlas)                   |
| ODM            | Mongoose                                  |
| Templating     | EJS + ejs-mate (layouts)                  |
| Authentication | Passport.js, passport-local, passport-local-mongoose |
| Sessions       | express-session, connect-mongo            |
| Validation     | Joi                                        |
| Styling        | Bootstrap                                 |
| Deployment     | Render (app), MongoDB Atlas (database)    |

---

## Project Structure

```
wanderlust/
├── models/
│   ├── listing.js          # Listing schema, model, cascade delete hook
│   ├── review.js           # Review schema and model
│   └── user.js             # User schema with passport-local-mongoose plugin
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Master layout (navbar, footer, flash messages)
│   ├── listings/           # index, show, new, edit templates
│   ├── users/               # login, signup templates
│   └── partials/            # navbar, footer, flash partials
├── routes/
│   ├── listing.js          # Listing CRUD routes
│   ├── review.js           # Review routes
│   └── user.js              # Auth routes
├── controllers/
│   ├── listings.js         # Listing controller logic
│   ├── reviews.js          # Review controller logic
│   └── users.js             # Auth controller logic
├── middleware/
│   └── index.js             # isLoggedIn, isOwner, isReviewAuthor, validateListing, validateReview
├── utils/
│   ├── wrapAsync.js         # Async error-forwarding wrapper
│   └── ExpressError.js      # Custom error class with status code
├── public/
│   └── css/                 # Custom stylesheets
├── init/                    # Database seed data
├── schema.js                 # Joi validation schemas
├── app.js                    # Express app entry point
├── cloudConfig.js             # Cloud/image configuration
├── middleware.js
├── package.json
└── .env                       # Environment variables (not committed)
```

---

## Database Schema

**Listing**

| Field       | Type     | Notes                              |
|-------------|----------|-------------------------------------|
| title       | String   | Required                            |
| description | String   | Required                            |
| image       | Object   | `{ url, filename }`                 |
| price       | Number   | Required, min 0                     |
| location    | String   | Required                            |
| country     | String   | Required                            |
| reviews     | [ObjectId] | References Review documents       |
| owner       | ObjectId | References User document            |

**Review** — references the parent listing; deleted via cascade when the listing is removed.

**User** — `username` and `hash` fields are managed automatically by `passport-local-mongoose`, which handles pbkdf2 password hashing and salting.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)

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

3. Create a `.env` file in the project root

   ```env
   ATLASDB_URL=mongodb://127.0.0.1:27017/wanderlust
   SECRET=your_session_secret_key_here
   ```

4. Start the development server

   ```bash
   nodemon app.js
   ```

5. Open the app

   ```
   http://localhost:8080/listings
   ```

---

## Environment Variables

| Variable      | Description                                  |
|---------------|-----------------------------------------------|
| `ATLASDB_URL` | MongoDB connection string                      |
| `SECRET`      | Secret used to sign session cookies            |
| `PORT`        | Server port (defaults to 8080 if not set)      |

---

## API Routes

| Method | Route                          | Description                  |
|--------|----------------------------------|-------------------------------|
| GET    | `/listings`                     | View all listings             |
| GET    | `/listings/new`                 | New listing form (auth required) |
| POST   | `/listings`                     | Create a listing              |
| GET    | `/listings/:id`                 | View a single listing         |
| GET    | `/listings/:id/edit`            | Edit listing form (owner only)|
| PUT    | `/listings/:id`                 | Update a listing (owner only) |
| DELETE | `/listings/:id`                 | Delete a listing (owner only) |
| POST   | `/listings/:id/reviews`         | Add a review                  |
| DELETE | `/listings/:id/reviews/:rid`    | Delete a review (author only) |
| GET    | `/signup`                       | Signup form                   |
| POST   | `/signup`                       | Register a new user           |
| GET    | `/login`                        | Login form                    |
| POST   | `/login`                        | Authenticate a user           |
| GET    | `/logout`                       | Log out the current user      |

---

## Security

- Passwords are hashed and salted using pbkdf2 via `passport-local-mongoose` — no plaintext passwords are stored
- Sessions use HTTP-only cookies and are persisted server-side in MongoDB Atlas via `connect-mongo`
- Route-level middleware (`isLoggedIn`, `isOwner`, `isReviewAuthor`) enforces authentication and ownership checks before sensitive actions
- All incoming listing and review data is validated server-side with Joi before reaching the database
- Centralized error handling ensures unexpected failures return controlled error responses instead of stack traces

---

## Deployment

- **Source control:** GitHub
- **Application hosting:** Render (reads `PORT` from the environment at runtime)
- **Database hosting:** MongoDB Atlas (connected via `ATLASDB_URL`)

---

## Future Enhancements

- Booking system with date-based availability
- Payment gateway integration
- Map integration for listing locations
- Cloud-based image uploads (e.g., Cloudinary)

---

## Author

**Udit Sharma**
B.Tech CSE, Final Year — Bahra University, Shimla Hills
GitHub: [github.com/UditSharma97](https://github.com/UditSharma97)
