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
} 

5. API Endpoints
Base URL: http://localhost:4000/api/tasks

5.1 Create a Task
POST /api/tasks

5.2 Get All Tasks (List)
GET /api/tasks

5.3 Get a Single Task
GET /api/tasks/:id

5.4 Update a Task
PUT /api/tasks/:id

5.5 Delete a Task
DELETE /api/tasks/:id

