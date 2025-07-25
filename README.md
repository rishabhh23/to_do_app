Task Manager (Express + Next.js)
A simple Task Management (To‑Do) application with:

Backend: Node.js + Express + TypeScript (in‑memory storage)

Frontend: Next.js + TailwindCSS

Features: Create, list, filter, update, delete tasks

Extras: Pagination, search by title, filter by status, Swagger API docs

Note: Data is stored in memory (an array). When you restart the backend server, all tasks are cleared.

1. Project Structure

   project/
   ├── backend/ # Express API (TypeScript)
   │ └── src/...
   └── frontend/ # Next.js UI (TypeScript + Tailwind)
   └── src/...

2. Prerequisites
   Install Node.js (v18+ recommended)

Have npm available (comes with Node.js)

3. Setup & Run
   3.1 Backend (API Server)

   cd backend
   npm install
   npm run dev
   Backend runs at: http://localhost:4000

http://localhost:4000/api/tasks → your task endpoint
http://localhost:4000/api/docs → Swagger

3.2 Frontend (Next.js App)
In a new terminal:

cd frontend
npm install
Create a .env.local file (optional, only if backend is at a different URL):

NEXT_PUBLIC_API_BASE=http://localhost:4000
Then run:

npm run dev
Frontend runs at: http://localhost:3000

4. Task Object Format
   Each task looks like this:

json

{
"id": "uuid-string",
"title": "My Task",
"description": "What I need to do",
"status": "PENDING" | "IN_PROGRESS" | "COMPLETED",
"createdAt": "2025-07-25T10:30:00.000Z",
"updatedAt": "2025-07-25T10:30:00.000Z"
} 5. API Endpoints
Base URL: http://localhost:4000/api/tasks

5.1 Create a Task
POST /api/tasks

Request Body (JSON):

json

{
"title": "Buy groceries",
"description": "Milk, eggs, bread",
"status": "PENDING"
}
Response (201 Created):

json

{
"id": "b0f1b3c0-7e6a-4d0c-9c5d-123456789abc",
"title": "Buy groceries",
"description": "Milk, eggs, bread",
"status": "PENDING",
"createdAt": "2025-07-25T10:30:40.123Z",
"updatedAt": "2025-07-25T10:30:40.123Z"
}

5.2 Get All Tasks (List)
GET /api/tasks

Supports query parameters:

Parameter Type Description Example
page number Page number (default: 1) ?page=2
pageSize number Items per page (default: 10) ?pageSize=5
status string Filter by status ?status=PENDING
title string Search by partial title (case-insensitive) ?title=gro

Example:
GET /api/tasks?page=1&pageSize=5&status=PENDING&title=buy
Response (200 OK):

json
{
"data": [
{
"id": "b0f1b3c0-7e6a-4d0c-9c5d-123456789abc",
"title": "Buy groceries",
"description": "Milk, eggs, bread",
"status": "PENDING",
"createdAt": "2025-07-25T10:30:40.123Z",
"updatedAt": "2025-07-25T10:30:40.123Z"
}
],
"meta": {
"page": 1,
"pageSize": 5,
"total": 1,
"totalPages": 1
}
}

5.3 Get a Single Task
GET /api/tasks/:id

Example:
GET /api/tasks/b0f1b3c0-7e6a-4d0c-9c5d-123456789abc

Response (200 OK):

json
{
"id": "b0f1b3c0-7e6a-4d0c-9c5d-123456789abc",
"title": "Buy groceries",
"description": "Milk, eggs, bread",
"status": "PENDING",
"createdAt": "2025-07-25T10:30:40.123Z",
"updatedAt": "2025-07-25T10:30:40.123Z"
}
If not found (404):

json
{ "error": "Not found" }

5.4 Update a Task
PUT /api/tasks/:id

You can send any of the fields: title, description, status.

Request Body:

json
{
"status": "COMPLETED"
}
Response (200 OK):

json
{
"id": "b0f1b3c0-7e6a-4d0c-9c5d-123456789abc",
"title": "Buy groceries",
"description": "Milk, eggs, bread",
"status": "COMPLETED",
"createdAt": "2025-07-25T10:30:40.123Z",
"updatedAt": "2025-07-25T10:35:12.456Z"
}

5.5 Delete a Task
DELETE /api/tasks/:id

Response (204 No Content): empty body.

If not found (404)

8. Troubleshooting
   Problem Solution
   Route not found at / Use /api/tasks or add a root route in backend.
   CORS errors Ensure backend is running on port 4000 and CORS middleware is enabled (already included).
   Tasks disappear on restart Expected: in‑memory storage resets each time.
