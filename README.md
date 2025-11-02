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
