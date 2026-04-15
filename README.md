# Property Management

A full-stack property management application.

## Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Backend:** Node.js / Express
- **Database:** MySQL

## Project Structure

```
Property/
├── frontend/          # Next.js app
│   ├── app/           # App router pages
│   └── package.json
├── backend/           # Express API
│   ├── config/        # DB config & schema
│   ├── controllers/   # Route handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── package.json
└── package.json       # Root scripts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
npm run install:all
```

### 2. Set up MySQL

Create a `.env` file in `backend/` (see `.env.example`), then run the schema:

```bash
mysql -u root -p < backend/config/schema.sql
```

### 3. Run development servers

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | /api/properties       | List all properties |
| GET    | /api/properties/:id   | Get a property      |
| POST   | /api/properties       | Create a property   |
| PUT    | /api/properties/:id   | Update a property   |
| DELETE | /api/properties/:id   | Delete a property   |
| GET    | /api/health           | Health check        |
