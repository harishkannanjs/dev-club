Full Stack To-Do Application

A beginner-friendly Full Stack To-Do App built using HTML, CSS, JavaScript, Node.js, Express, and MongoDB Atlas, and deployed using Render (Backend) and Netlify (Frontend).

This project is designed for college students to understand full stack development and deployment step by step.

🚀 Tech Stack
Frontend

HTML

CSS

JavaScript (Vanilla JS)

Backend

Node.js

Express.js

Database

MongoDB Atlas

Deployment

Backend: Render

Frontend: Netlify

📂 Project Structure
fullstack-todo-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todo.controller.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   ├── health.routes.js
│   │   └── todo.routes.js
│   ├── server.js
│   ├── .env.example
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── index.html
│
├── .gitignore
├── package.json
└── README.md

📥 How to Get the Project (Recommended for Students)
Option 1: Download ZIP (Beginner-Friendly)

Click the green Code button on GitHub

Select Download ZIP

Extract the ZIP file

Open the folder in VS Code

✅ No Git knowledge required

⚙️ Local Setup (Mandatory Before Deployment)
1️⃣ Backend Setup
cd backend
npm install

2️⃣ Create .env File (LOCAL ONLY)

Inside the backend folder:

Copy .env.example

Rename it to .env

Add your MongoDB Atlas connection string:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000


⚠️ Do NOT push .env to GitHub

3️⃣ Run Backend Locally
node server.js


Expected output:

MongoDB Connected
Server running on http://localhost:5000

☁️ Backend Deployment (Render)

Go to https://render.com

New → Web Service

Connect your GitHub repository

Render Configuration
Setting	Value
Root Directory	backend
Build Command	npm install
Start Command	node server.js
Add Environment Variable on Render
Key	Value
MONGO_URI	Your MongoDB Atlas URI

Deploy and wait until status is Live.

🌐 Frontend Deployment (Netlify)
1️⃣ Update Backend API URL

Open:

frontend/js/app.js


Replace:

const API_URL = "http://localhost:5000/api/todos";


With:

const API_URL = "https://your-render-backend-url.onrender.com/api/todos";

2️⃣ Deploy on Netlify

Go to https://netlify.com

New site → Import from GitHub

Select repository

Netlify Settings
Field	Value
Base directory	frontend
Build command	(leave empty)
Publish directory	frontend

Deploy the site.

✅ Final Testing

Open Netlify URL

Add a todo

Refresh page → todo should stay

Edit todo → save → refresh → stays

Delete todo → refresh → gone

If all work → 🎉 Project Successfully Deployed
