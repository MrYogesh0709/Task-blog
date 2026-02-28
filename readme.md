
---

#  Blog  API

A RESTful Blog API built with **Node.js, Express, and MongoDB** that supports authentication, authorization, and blog management.

## 🚀 Features

### Authentication

* User registration
* User login with JWT authentication
* Password hashing using bcrypt

### Blog Management

* Create blog post (authenticated)
* Get all blog posts (pagination supported)
* Search blog posts by title (bonus feature)
* Get single blog post by ID
* Update own blog post only
* Delete own blog post only

### Security & Validation

* JWT authentication middleware
* Ownership authorization (only author can modify)
* Proper error handling
* Protected routes

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* bcryptjs

---

## ⚙️ Installation & Setup

### 1️⃣ Clone repository

```bash
git clone https://github.com/MrYogesh0709/Task-blog.git
cd Task-blog
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create environment file

Create `.env` in root:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/blog_db
ACCESS_TOKEN=your_secret_key
```

### 4️⃣ Start server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 🔐 Authentication

After login, include token in headers:

```
Authorization: Bearer YOUR_TOKEN
```

---

## 📌 API Endpoints

### Auth Routes

#### Register

**POST** `/api/v1/auth/register`

```json
{
  "name": "Yogesh",
  "email": "yogesh@gmail.com",
  "password": "123456"
}
```

#### Login

**POST** `/api/v1/auth/login`

```json
{
  "email": "yogesh@gmail.com",
  "password": "123456"
}
```
---

### Blog Routes

#### Create Blog

**POST** `/api/v1/blog`

Headers: Authorization required

```json
{
  "title": "Node.js Guide",
  "content": "Learning Node is fun",
  "tags": ["nodejs","backend"]
}
```

---

#### Get All Blogs (Pagination)

**GET** `/api/v1/blog?page=1&limit=10`

---

#### 🔍 Search Blogs by Title

**GET**

```
/api/v1/blog?search=node
```

---

#### Get Single Blog

**GET** `/api/v1/blog/:blogId`

---

#### Update Blog (Owner Only)

**PATCH** `/api/v1/blog/:blogId`

---

#### Delete Blog (Owner Only)

**DELETE** `/api/v1/blog/:blogId`

---

## ❗ Error Responses

| Code | Meaning                        |
| ---- | ------------------------------ |
| 400  | Bad request / validation error |
| 401  | Unauthorized                   |
| 403  | Forbidden                      |
| 404  | Resource not found             |
| 500  | Server error                   |

---

## 🧪 Testing

Use Postman or any API client.

Test order:

1. Register user
2. Login → copy token
3. Create blog
4. Get blogs
5. Update blog
6. Delete blog

---

