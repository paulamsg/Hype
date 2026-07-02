
# Hype

A full-stack web application to discover real cultural events in your city, save them in folders, and share plans with your friends.

Built as a Final Master's Project (TFM) at ESAT.

---
## UI
### Login & Register
Authentication screens that allow users to sign in to an existing account or create a new one to access the platform.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8f38c7ba-9b58-4fc6-b040-061528cb3c63" width="48%" />
  <img src="https://github.com/user-attachments/assets/16fda03b-33c4-4683-8ca0-ec250a873148" width="48%" />
</p>

---

### Discover
Discover is the application's main screen, allowing users to browse real-time cultural events using filters such as category, date, city, and price. It displays featured events when no category is selected and dynamically updates the event grid based on the active filters. Users can view detailed event information, save events, share them with friends or groups, and access external ticket purchase links. When a category is selected, the layout adapts to highlight the most relevant events within that category.


<p align="center">
  <img src="https://github.com/user-attachments/assets/1e2998da-0172-4f3a-a415-6bc856b044cb" width="48%" />
  <img src="https://github.com/user-attachments/assets/e8aa1bab-4d05-40bf-8440-d01f9b607b30" width="48%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/80a45092-bfa1-466c-9256-84af955a3515" width="48%" />
  <img src="https://github.com/user-attachments/assets/d678642e-46f5-465c-8b38-5ec5d69e8d28" width="48%" />
</p>

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

