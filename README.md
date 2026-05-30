# 🎵 Freetune

*A free, community-driven music sharing & listening platform.*

Freetune is a full-stack web application that allows users to **upload**, **share**, and **listen** to music without ads, paywalls, or premium restrictions. The platform focuses on providing a seamless music experience while maintaining a scalable and maintainable codebase.

---

# 🚧 Recent Updates

Freetune recently underwent a major frontend architecture refactor to improve scalability, maintainability, and developer experience.

### ✅ Redux Toolkit Migration

* Migrated from Context API to Redux Toolkit
* Centralized application state management
* Added dedicated `authSlice`
* Added dedicated `musicSlice`
* Reduced prop drilling across components
* Improved state predictability

### ✅ Component Refactoring

* Refactored authentication forms
* Created reusable UI components
* Improved component composition
* Reduced duplicate code
* Simplified maintenance

### ✅ Music Management Improvements

* Moved music fetching logic to Redux
* Centralized playback state
* Improved synchronization between player and UI
* Better song state handling across pages

### ✅ Codebase Improvements

* Cleaner folder structure
* Better separation of concerns
* Improved scalability for future features
* Enhanced developer experience

---

# 🚀 Features

## 🔐 Authentication

* User Signup
* User Login
* User Logout
* JWT Authentication
* Secure Password Hashing
* Delete Account
* Protected Routes
* User Session Management

---

## 🎶 Music Features

* Upload Music
* Stream Music
* Custom Audio Player
* Play / Pause Controls
* Next / Previous Song
* Auto Play Next Track
* Music Metadata Storage
* Dedicated Music Details Page
* Responsive Music Experience

---

## 👤 User Features

* User Profile
* Avatar Upload
* Avatar Update
* View Uploaded Music
* Profile Management
* Account Settings

---

## 🤝 Sharing Features

* Share Songs With Other Users
* View Shared Music
* Track Shared By User
* Track Shared To User
* Separate Shared Music Collection

---

# 🏗 Tech Stack

## Frontend

* React.js
* React Router DOM
* Redux Toolkit
* React Redux
* Tailwind CSS
* React Hook Form
* Axios
* HTML5 Audio API

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

---

# 🗂 State Management Architecture

### Auth Slice

Handles:

* User Authentication
* Login State
* User Information
* Authentication Loading States

### Music Slice

Handles:

* Music Collection
* Current Playing Song
* Playback State
* Music API Responses
* Global Music Controls

### Benefits of Redux Toolkit

* Centralized State Management
* Reduced Prop Drilling
* Better Scalability
* Cleaner Architecture
* Easier Debugging
* Predictable State Updates

---

# 🎨 UI & UX

### Design Principles

* Modern Minimal Design
* Dark Theme Interface
* Mobile Responsive Layout
* Reusable UI Components
* Consistent User Experience
* Fast Navigation
* Clean Visual Hierarchy

---

# 🌈 Color Palette

## Primary Colors

| Purpose              | Color     |
| -------------------- | --------- |
| Background           | `#111827` |
| Secondary Background | `#1F2937` |
| Card Background      | `#374151` |

## Accent Colors

| Purpose          | Color     |
| ---------------- | --------- |
| Purple Primary   | `#9333EA` |
| Purple Secondary | `#A855F7` |
| Blue Accent      | `#3B82F6` |
| Green Accent     | `#10B981` |
| Orange Accent    | `#F97316` |

## Text Colors

| Purpose          | Color     |
| ---------------- | --------- |
| Primary Text     | `#FFFFFF` |
| Secondary Text   | `#9CA3AF` |
| Interactive Text | `#C084FC` |

---

# 🖋 Typography

### Font Family

```css
font-family: "Inter", sans-serif;
```

### Font Weights

| Usage          | Weight |
| -------------- | ------ |
| Headings       | 700    |
| Navigation     | 500    |
| Body Text      | 400    |
| Secondary Text | 300    |

---

# 📂 Project Structure

```bash
src
├── app
│   └── store.js
│
├── features
│   ├── auth
│   │   └── authSlice.js
│   │
│   └── music
│       └── musicSlice.js
│
├── components
│   ├── ui
│   ├── auth
│   ├── music
│   └── profile
│
├── pages
├── routes
├── hooks
├── services
└── utils
```

---

# ⚡ Why Redux Toolkit?

As Freetune continued to grow, managing shared application state through Context API became increasingly difficult. Redux Toolkit was introduced to create a more scalable architecture and improve long-term maintainability.

This migration resulted in:

* Better state organization
* Cleaner components
* Easier debugging
* Improved scalability
* More maintainable codebase

---

# 🚀 Installation

## Clone Repository

```bash
git clone <repository-url>
cd freetune
```

## Install Dependencies

```bash
npm install
```

## Setup Environment Variables

Create a `.env` file:

```env
VITE_API_URL=your_backend_url
```

## Start Development Server

```bash
npm run dev
```

---

# 🔮 Future Improvements

* Playlist Support
* Like/Favorite Songs
* Search & Filtering
* Recently Played
* Follow Artists
* Music Recommendations
* Real-Time Notifications

---

# 📜 License

This project is licensed under the MIT License.

---

### Built with ❤️ using React, Redux Toolkit, Node.js, Express, and MongoDB.
