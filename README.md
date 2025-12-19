# 🎓 StudyNotion – Full-Stack EdTech Platform

StudyNotion is a **full-stack EdTech web application** that enables instructors to create and sell courses, and students to purchase, learn, and track their progress.  
The platform is designed with **scalability, role-based access, and real-world production practices** in mind.

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://edtech-platform-u8ey.vercel.app/

---

## 📌 Features

### 👤 Authentication & Authorization

- JWT-based authentication
- Role-based access control (Student / Instructor / Admin)
- Secure login, signup, and protected routes

### 🎓 Course Management

- Instructor can create, update, and delete courses
- Add sections and lectures to courses
- Upload video content using Cloudinary
- Draft & publish courses

### 🛒 Payments & Enrollment

- Razorpay payment gateway integration
- Secure checkout flow
- Automatic course enrollment after payment
- Payment verification via backend

### 📊 Student Dashboard

- View enrolled courses
- Track course progress
- Continue learning from last watched lecture

### 🧑‍🏫 Instructor Dashboard

- Revenue insights
- Course performance overview
- Manage courses and content

### ⚙️ Admin Capabilities

- Platform-level user and content management
- Category & course moderation

---

## 🛠️ Tech Stack

### Frontend

- **React.js (Vite)**
- **Tailwind CSS**
- **Redux Toolkit**
- **React Router DOM**
- **Axios**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **Bcrypt**
- **Razorpay**
- **Cloudinary**

### DevOps & Tools

- **Vercel** (Frontend Deployment)
- **Render** (Backend Deployment)
- **Git & GitHub**
- **Postman**
- **dotenv**

---

## 🧱 Project Architecture

![alt text](<ChatGPT Image Dec 19, 2025, 09_56_34 AM.png>)

---

## Backend (.env)

```
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

---

## ▶️ How to Run Locally

### 1️⃣ Clone the Repository

```
git clone https://github.com/DishankM/Edtech_Platform.git
cd Edtech_Platform
```

### 2️⃣ Run Backend

```
cd backend
npm install
npm run dev
```

### Backend will start at:

```
http://localhost:4000
```

### 3️⃣ Run Frontend

```
cd frontend
npm install
npm run dev
```

### Frontend will start at:

```
http://localhost:5173
```

---

### 🧪 API Testing

- Use Postman for testing protected routes.
- JWT token is required for secured endpoints
- Razorpay payment verification is handled on backend.

---

### Key Learnings

- Designing scalable REST APIs
- Role-based authentication & authorization
- Secure payment gateway integration
- Managing large React applications
- Real-world deployment issues & fixes
- Clean folder structure & service abstraction
