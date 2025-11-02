# 🍬 TDD Kata: Sweet Shop Management System

## 🧁 Objective

The goal of this project is to design, build, and test a **full-stack Sweet Shop Management System**.  
It demonstrates skills in **API development**, **database management**, **frontend implementation**, **testing**, and **modern development workflows** — including the effective use of **AI tools**.

---

## 🚀 Tech Stack

### 🔧 Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication** (with cookie-based sessions)
- **CORS with credentials** enabled
- **bcrypt** for password hashing

### 💻 Frontend
- **React.js (Vite)**
- **Axios** for API calls
- **React Router v6** for routing
- **Tailwind CSS** for styling
- **React Toastify** for notifications

---

## 🧠 Core Features

### 👤 Authentication
- User **registration** and **login**
- JWT stored securely in HTTP-only cookies
- Protected routes for both **user** and **admin** roles

### 🍭 Sweet Management

| Endpoint             | Method | Description                          | Access        |
| -------------------- | ------ | ------------------------------------ | ------------- |
| `/api/sweets`        | POST   | Add a new sweet                      | Admin         |
| `/api/sweets`        | GET    | View all sweets                      | Authenticated |
| `/api/sweets/search` | GET    | Search sweets by name/category/price | Authenticated |
| `/api/sweets/:id`    | PUT    | Update sweet details                 | Admin         |
| `/api/sweets/:id`    | DELETE | Delete a sweet                       | Admin         |

### 📦 Inventory Management

| Endpoint                   | Method | Description                         | Access     |
| -------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/sweets/:id/purchase` | POST   | Purchase a sweet (reduce quantity)  | User/Admin |
| `/api/sweets/:id/restock`  | POST   | Restock a sweet (increase quantity) | Admin      |

---

## 🧪 TDD Approach

- Followed **Red → Green → Refactor** pattern for backend services.
- Wrote unit tests for major functions (auth, sweets CRUD, and validation).
- Ensured all routes were tested for authorization and validation errors.

---

## 🧰 Installation & Setup

### 🗄 Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/sweet-shop-management.git
cd sweet-shop-management/backend

# Install dependencies
npm install

# Create .env file
touch .env
```

# .env
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sweetshop
JWT_SECRET=jwtsecretkey
CORS_ORIGIN=http://localhost:5173

```

# Run Backend
```
npm run dev
```

# 🖥 Frontend Setup
```
cd ../frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

# 🧩 User Roles

  | Role      | Capabilities                      |
| --------- | --------------------------------- |
| **User**  | View sweets, search, and purchase |
| **Admin** | Add, edit, delete, restock sweets |


# 🖼️ Screenshots

# Register/ Login
<img width="1671" height="850" alt="image" src="https://github.com/user-attachments/assets/a8dba997-a274-4749-8420-4d8c7a58a060" />
<img width="1889" height="884" alt="image" src="https://github.com/user-attachments/assets/78bc0e66-470d-4aaf-8b85-3f8a3936403b" />




# Admin
<img width="1894" height="722" alt="image" src="https://github.com/user-attachments/assets/1823369a-31a3-4353-a6fb-7aeeab1018f6" />
<img width="1890" height="882" alt="image" src="https://github.com/user-attachments/assets/ff005fb4-4165-48f6-ad2c-a98939a37316" />

# User
<img width="1890" height="504" alt="image" src="https://github.com/user-attachments/assets/1b2b25fb-aa8f-4fff-bed3-eb91c6efdfa7" />
<img width="1886" height="809" alt="image" src="https://github.com/user-attachments/assets/1d3c0fb0-4d36-4a1d-b7b1-69727d214f27" />
<img width="1893" height="851" alt="image" src="https://github.com/user-attachments/assets/10535189-7458-4394-ab25-5cc2e4c573bc" />






# 🧠 My AI Usage

# 🧩 Tools Used
- ChatGPT (OpenAI GPT-5)
- GitHub Copilot

# 💬 How I Used AI
- ChatGPT helped generate initial backend boilerplate for routes, controllers, and middleware logic.
- Used AI for debugging CORS with credentials, cookie handling, and protected route logic.
- Copilot assisted with repetitive JSX structure generation in the frontend (forms, modals, etc.).
- Asked AI for UI improvement suggestions to make the dashboard responsive and modern.

# ✨ Reflection

AI tools helped speed up development, especially during setup and refactoring.
However, I manually reviewed and validated all AI-generated code for correctness, security, and readability.
This experience strengthened my understanding of how to collaborate effectively with AI while maintaining code ownership and integrity.

# 🧾 Commit Example
```
feat: Complete Sweet Shop Management System MVP
Implemented full-stack functionality including authentication, protected routes,
CORS with cookies, and all CRUD operations for sweets and inventory.
Integrated a responsive and user-friendly frontend UI with admin and user dashboards.
Used an AI assistant to assist in initial component generation and UI polish.
Co-authored-by: AI Tool Name <AI@users.noreply.github.com>

```

# 🧪 Test Report

```
npm test

```
# 🏁 Conclusion

This project demonstrates a complete TDD-based full-stack system, built with clean architecture, JWT authentication, and AI-assisted workflow.
It’s production-ready, modular, and extensible for future enhancements.

# 💖 Thank You!

Thank you for checking out this project!
If you liked it, don’t forget to ⭐ the repo — your support means a lot!

