# Quick Task

A modern Money Transfer and Financial Services (MFS) application with real-time features. This application allows users to send money, manage financial tasks, and get notifications in real time. The application is built with React.js for the frontend and Node.js/Express for the backend, integrating MongoDB for data storage and Socket.IO for real-time communication.

---

## **Frontend**

The frontend of the application is built using **React.js**. It provides a responsive interface for the user to interact with the application. Features include authentication, real-time updates, and a dynamic user interface using **TailwindCSS**.

### **Technologies Used**

- React.js
- TailwindCSS
- Axios for HTTP requests
- Socket.IO for real-time communication
- React-Router for routing
- React Hot Toast for notifications
- FingerprintJS for user identification

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mfs-frontend.git
   cd mfs-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### **Running the App**

1. Start the development server:

   ```bash
   npm start
   ```

   This will run the application on `http://localhost:5173` by default.

---

## **Backend**

The backend is built using **Node.js** with **Express.js**. It includes user authentication, data handling with **MongoDB**, and real-time communication through **Socket.IO**.

### **Technologies Used**

- Node.js with Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- bcryptjs for password hashing
- CORS for handling cross-origin requests
- Socket.IO for real-time updates

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mfs-backend.git
   cd mfs-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:
   ```bash
   MONGO_URI=mongodb://localhost:27017/mfs
   JWT_SECRET=your_jwt_secret
   ```

### **Running the Backend**

1. Start the backend server:

   ```bash
   npm start
   ```

   This will run the backend server on `http://localhost:5000` by default.

---
