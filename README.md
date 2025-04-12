# Role-Based Task Management System

A full-stack web application that allows users to register, log in, and manage tasks based on their roles (`admin` or `user`). Admins can view all tasks, while users can create and view only their own tasks.

## 🚀 Features

### 🔒 Backend
- User authentication using **JWT**
- Role-based access control using **Express middleware**
- RESTful APIs for:
  - Registering users
  - Logging in
  - Logging out
  - Task management
- MongoDB as the database for storing users and tasks

### 🎨 Frontend
- **React.js** single-page application
- Login and registration forms
- Separate dashboards for users and admins
- Task creation (user only)
- View task list (user/admin based on role)
- Protected routes using role-based access

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Cookie-parser & CORS

### Frontend
- React.js
- Axios for API requests
- React Router DOM for routing
- Tailwind CSS for styling

## 📁 Project Structure

### Backend
```
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env.example
├── server.js
```

### Frontend
```
frontend/
├── components/
├── pages/
├── App.js
├── main.jsx
```

## 🧪 How to Run the Project

### Prerequisites
- Node.js & npm
- MongoDB (local or cloud)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in the MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Environment Variables
Create a `.env` file in the backend directory with:
```
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## ✅ Functionalities
- Register as a `user` (admin is pre-created)
- Login with email and password
- Role is stored in JWT and localStorage
- User can:
  - Create new tasks
  - View own tasks
- Admin can:
  - View all user tasks

## 🔐 Routes

### Auth Routes (`/api/auth`)
- `POST /register` - Register new user (default role: user)
- `POST /login` - Login with email & password
- `GET /logout` - Logout and clear cookie

### Task Routes (`/api/tasks`)
- `POST /` - Create new task (user only)
- `GET /` - Fetch tasks
  - User: gets only their tasks
  - Admin: gets all tasks

## 🌍 Deployment Tips

### Backend
- Use [Render](https://render.com) or [Railway](https://railway.app) for Node.js deployment
- Set environment variables on the hosting platform
- Enable CORS for frontend domain

### Frontend
- Deploy with [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/)
- Set backend API URL in environment config

## 👨‍💻 Author
**Vishal Rathore**
- 🌐 Portfolio: [vishalrathore.hashnode.dev](https://vishalrathore.hashnode.dev)
- 💼 LinkedIn: [linkedin.com/in/vishalrathore8oct](https://linkedin.com/in/vishalrathore8oct)
- 🛠️ GitHub: [github.com/vishalrathore8oct](https://github.com/vishalrathore8oct)

---

> This project was built as part of a learning hackathon to practice role-based authentication, full-stack integration, and secure task handling.

