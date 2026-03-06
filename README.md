# Hype

> **Status: Work in Progress — Final Master's Project (TFM)**

A full-stack web application to discover real cultural events in your city, organize them in folders and share plans with your close friends.

---

## Tech Stack

### Backend
- **Node.js** — runtime environment
- **Express** — framework for building the REST API
- **TypeScript** — typed JavaScript for safer and more maintainable code
- **PostgreSQL** — relational database
- **Prisma 5** — ORM to define models, run migrations and query the database
- **bcrypt** — password encryption
- **JWT (jsonwebtoken)** — authentication and session management
- **dotenv** — environment variable management
- **cors** — cross-origin resource sharing for frontend-backend communication
- **axios** — HTTP client for external API calls
- **nodemon + ts-node** — auto-restart server on file changes during development

### Frontend
- **React 18** — UI library
- **TypeScript** — typed JavaScript
- **React Router v6** — client-side routing and protected routes
- **Axios** — HTTP client for backend communication
- **SCSS** — styling with custom properties, reusable components and modular architecture

### External APIs
- **Ticketmaster Discovery API** — real cultural events data (concerts, theatre, sports, family)
