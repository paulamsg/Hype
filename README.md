# Hype

A full-stack web application to discover real cultural events in your city, save them in folders, and share plans with your friends.

Built as a Final Master's Project (TFM) at ESAT.

---

## Features

- **Discover events** — real events from the Ticketmaster API filtered by city, category, price and date
- **Save events** — organize events into folders: Want to go / Going / Gone / Past
- **Friends** — send and accept friend requests, view their activity in a social feed
- **Groups** — create groups with friends, share events and vote on them
- **Notifications** — real-time notification badge for friend requests, group invites and shared events
- **Photos** — upload and view photos from events you attended
- **Public profiles** — visit friends' profiles and see their events and photos

---

## Tech Stack

### Backend
- **Node.js + Express 5** — REST API
- **TypeScript** — typed JavaScript
- **PostgreSQL** — relational database
- **Prisma 5** — ORM for models, migrations and queries
- **bcryptjs** — password hashing
- **JWT (jsonwebtoken)** — authentication and session management
- **Zod** — request validation
- **node-cron** — scheduled jobs (event expiration, featured events)
- **axios** — HTTP client for Ticketmaster API calls
- **cors + dotenv** — cross-origin config and environment variables
- **nodemon + ts-node** — development server with auto-restart

### Frontend
- **React 19** — UI library
- **TypeScript** — typed JavaScript
- **React Router v7** — client-side routing with protected routes
- **React Hook Form + Zod** — form handling and validation
- **Axios** — HTTP client for backend communication
- **SCSS** — custom styling with modular architecture
- **Lucide React** — icon library
- **date-fns** — date formatting utilities

### External APIs
- **Ticketmaster Discovery API** — real cultural events (concerts, theatre, sports, family)
- **Cloudinary** — image storage and delivery for user photos

---

## Project Structure

```
Hype/
├── hype-backend/
│   ├── prisma/              # Schema and migrations
│   └── src/
│       ├── controllers/     # Route handlers
│       ├── middleware/      # Auth and error middleware
│       ├── routes/          # Express routers
│       ├── jobs/            # Cron jobs
│       ├── config/          # Database connection
│       └── server.ts        # Entry point
└── hype-frontend/
    └── src/
        ├── components/      # Reusable UI components
        ├── context/         # Auth and user context
        ├── pages/           # Route-level components
        ├── services/        # API calls
        ├── types/           # TypeScript interfaces
        ├── utils/           # Helper functions
        └── scss/            # Styles
```

---

## Setup

### Requirements
- Node.js 18+
- PostgreSQL database
- Ticketmaster API key
- Cloudinary account

### Backend

```bash
cd hype-backend
npm install
```

Create `.env`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/hype
JWT_SECRET=your_secret
API_KEY_TICKETMASTER=your_ticketmaster_key
```

```bash
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd hype-frontend
npm install
```

Create `.env`:
```
VITE_SERVER_URL=http://localhost:3000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

```bash
npm run dev
```

---

