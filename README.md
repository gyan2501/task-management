# Task Management Web App

## Overview
The Task Management Web App is a comprehensive platform that allows users to manage their tasks efficiently. Users can create, edit, delete, search, filter, and mark tasks as complete. Additionally, the app includes user authentication and pagination for managing tasks.

## Features
1. **User Authentication**
   - Users can create accounts or log in with existing credentials.
   - Authentication is implemented using JWT (JSON Web Tokens) for secure access.

2. **Task Management**
   - Users can create new tasks with a title, description, and priority.
   - Edit and update existing tasks.
   - Delete tasks.
   - Mark tasks as complete or pending.

3. **Search and Filter**
   - Users can search for tasks based on keywords.
   - Filter tasks by status (Completed or Pending).

4. **Pagination**
   - Tasks are paginated, displaying a limited number per page.
   - Users can navigate between pages.


## Technology Stack
- **Frontend:** React.js + Material-UI
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Project Structure
- `frontend/`: Frontend code (React.js)
- `server/`: Backend code (Express.js)
- `frontend/src/components`: React components 

## Live Links
- **Frontend:** [https://task-management-v1.netlify.app/](https://task-management-v1.netlify.app/)
- **API:** [https://taskmanagement-backend-q6uw.onrender.com/](https://taskmanagement-backend-q6uw.onrender.com/)

## API Endpoints
### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login a user.

### Tasks
- **GET** `/api/tasks`: Get all tasks with optional query parameters for search, status filter, pagination (`search`, `status`, `page`, `limit`).
- **POST** `/api/tasks`: Create a new task.
- **PUT** `/api/tasks/:id`: Update an existing task.
- **DELETE** `/api/tasks/:id`: Delete a task.
- **PUT** `/api/tasks/:id/complete`: Mark a task as complete.


## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/gyan2501/Webledger-FSA
   ```
2. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```sh
   cd server
   npm install
   ```
4. Create a .env file in the server directory with the following variables:
   ```js
   PORT=8080
   MONGODB_URL=<your-mongodb-url>
   JWT_SECRET_KEY=<your-secret-key>
5. Start the frontend and backend servers:
 - Frontend:
    ```sh
    cd frontend
    npm start
    ```

- Backend:
  ```sh
    cd server
    npm run server
  ```
6. Access the application locally in your web browser at http://localhost:3000.
