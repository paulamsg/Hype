
# Hype

A full-stack web application that allows users to discover real cultural events in their city, save them into personal collections, and share plans with friends.

Developed as a **Final Master's Project (TFM)** at ESAT.

---

# UI 

## 🔐 Login & Register

Authentication screens that allow users to sign in to an existing account or create a new one to access the platform.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8f38c7ba-9b58-4fc6-b040-061528cb3c63" width="48%" />
  <img src="https://github.com/user-attachments/assets/16fda03b-33c4-4683-8ca0-ec250a873148" width="48%" />
</p>

---

## 🔍 Discover

The main screen of the application, where users can browse real-time cultural events using filters such as **category, date, city, and price**. Featured events are displayed when no category is selected, while the event grid updates dynamically according to the active filters. Users can view event details, save events, share them with friends or groups, and access external ticket purchase links.

<p align="center">
  <img src="https://github.com/user-attachments/assets/1e2998da-0172-4f3a-a415-6bc856b044cb" width="48%" />
  <img src="https://github.com/user-attachments/assets/e8aa1bab-4d05-40bf-8440-d01f9b607b30" width="48%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/80a45092-bfa1-466c-9256-84af955a3515" width="48%" />
  <img src="https://github.com/user-attachments/assets/d678642e-46f5-465c-8b38-5ec5d69e8d28" width="48%" />
</p>

---

## 👥 Friends Feed

Displays the latest activity from the user's friends, including saved events, uploaded photos, and shared events. The integrated search allows users to find people by **email** or **@username**, while the sidebar provides quick access to all joined groups.

<p align="center">
  <img src="https://github.com/user-attachments/assets/3bb1d69d-289b-4c6d-9ddf-8fb650971131" width="90%" />
</p>

### Empty Feed

Displayed when none of the user's friends have interacted with the platform yet. It serves as the initial state of the Friends Feed and is automatically replaced as soon as friends start saving or sharing events.

<img width="950" height="496" alt="image (10)" src="https://github.com/user-attachments/assets/688b0099-2a58-4f70-9ba6-8d13ae197b2b" />

---

## 👥 Groups

Manage shared events and collaborate with group members. Each group displays its shared events, where members can vote on different options and view each other's votes. Group owners can manage members, rename or delete the group, while other members can leave it at any time.

<p align="center">
  <img src="https://github.com/user-attachments/assets/4063bb74-5768-4176-9a62-146027c0458e" width="90%" />
</p>

### Empty Groups

Displayed when the user has not joined any groups yet. It provides a brief introduction to the feature and offers quick actions to create a new group or find friends, serving as the starting point for the application's social experience.

<p align="center">
  <img src="https://github.com/user-attachments/assets/0063c596-ac98-4110-9725-4aaf0cb4afe0" width="90%" />
</p>

---

## 🔔 Notifications 
Displays all notifications related to the user's activity, including friend requests, group invitations, and shared events. Notifications are updated in real time and allow users to quickly respond or navigate to the corresponding content.

<img width="948" height="498" alt="image (11)" src="https://github.com/user-attachments/assets/82219f41-3f2e-4bd0-802a-8a9eaf6c05cc" />

---


## 👤 Profile

The user's personal profile, where they can view their account information, saved events, uploaded photos, and access the main account features.

<img width="952" height="497" alt="image (17)" src="https://github.com/user-attachments/assets/4c1ae6e4-3d21-44ee-a53b-5620bdf8eba7" />


### Edit Profile

Allows users to update their personal information, including their display name, username, biography, city, and profile picture.

<img width="952" height="498" alt="image (16)" src="https://github.com/user-attachments/assets/85705214-4152-42bc-8cde-c5a09854da6e" />


### Upload Photo

Enables users to upload and manage photos from events they have attended, which are displayed on their public profile.

<img width="950" height="498" alt="image (15)" src="https://github.com/user-attachments/assets/976367c8-4233-4607-9331-7f8dae20d8a1" />


###  Friends List

Displays all the user's friends and provides quick access to their public profiles.

<img width="950" height="496" alt="image (14)" src="https://github.com/user-attachments/assets/d510565f-de7c-4479-a481-14599b289c19" />


###  Sign Out

Allows users to securely sign out of their account through a confirmation dialog.

<img width="950" height="500" alt="image (12)" src="https://github.com/user-attachments/assets/c68772c3-97a9-4270-bb61-34a1a11ac464" />

---


#  Features

- **Discover Events** — Browse real cultural events from the Ticketmaster API filtered by city, category, price, and date.
- **Save Events** — Organize events into personal collections: *Want to Go*, *Going*, *Gone*, and *Past*.
- **Friends** — Send and accept friend requests and keep track of your friends' activity.
- **Groups** — Create groups, share events, and vote together.
- **Notifications** — Receive real-time notifications for friend requests, invitations, and shared events.
- **Photos** — Upload and browse photos from attended events.
- **Public Profiles** — Visit friends' profiles and explore their events and galleries.

---

#  Tech Stack

## Backend

- Node.js + Express 5
- TypeScript
- PostgreSQL
- Prisma 5
- bcryptjs
- JWT (jsonwebtoken)
- Zod
- node-cron
- Axios
- cors + dotenv
- nodemon + ts-node

## Frontend

- React 19
- TypeScript
- React Router v7
- React Hook Form + Zod
- Axios
- SCSS
- Lucide React
- date-fns

## External APIs

- Ticketmaster Discovery API
- Cloudinary

---

# 📂 Project Structure

```text
Hype/
├── hype-backend/
│   ├── prisma/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── jobs/
│       ├── config/
│       └── server.ts
│
└── hype-frontend/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        ├── services/
        ├── types/
        ├── utils/
        └── scss/
```

---

#  Setup

## Requirements

- Node.js 18+
- PostgreSQL
- Ticketmaster API Key
- Cloudinary Account

## Backend

```bash
cd hype-backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/hype
JWT_SECRET=your_secret
API_KEY_TICKETMASTER=your_ticketmaster_key
```

```bash
npx prisma migrate dev
npm run dev
```

## Frontend

```bash
cd hype-frontend
npm install
```

Create a `.env` file:

```env
VITE_SERVER_URL=http://localhost:3000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset


```bash
npm run dev
```
````
