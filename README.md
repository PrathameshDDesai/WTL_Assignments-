# TY B.Tech Computer Engineering - Web Development Laboratory (WTL)
**Course:** Web Technology Laboratory | **Pattern:** 2023 Pattern | **Semester:** V  
**Department of Computer Engineering, Sanjivani College of Engineering, Kopargaon**

---

## 📚 Comprehensive Assignments Directory

This repository contains the complete implementation of all 11 laboratory assignments along with their theoretical documentation, algorithms, test cases, and execution steps.

| Assignment # | Folder | Description | Tech Stack | Status |
|:---:|:---|:---|:---|:---:|
| **01** | [`Assignment_01_Responsive_Homepage`](./Assignment_01_Responsive_Homepage/) | Modern Responsive Hospital & Healthcare Homepage | HTML5, CSS3, Bootstrap 5 | ✅ Completed |
| **02** | [`Assignment_02_Todo_List`](./Assignment_02_Todo_List/) | Dynamic To-do List Web Application with LocalStorage | HTML5, CSS3, JavaScript (ES6) | ✅ Completed |
| **03** | [`Assignment_03_Fetch_API`](./Assignment_03_Fetch_API/) | Public API Fetching using `Async/Await` & Dynamic DOM manipulation | Vanilla JavaScript, Fetch API, DOM | ✅ Completed |
| **04** | [`Assignment_04_TypeScript_App`](./Assignment_04_TypeScript_App/) | Client-side Interactive Application with Strict Typing | TypeScript, Modern CSS, HTML5 | ✅ Completed |
| **05** | [`Assignment_05_React_Props_State`](./Assignment_05_React_Props_State/) | Functional Components, JSX, Props, & `useState` | React.js, Vite, Modern CSS | ✅ Completed |
| **06** | [`Assignment_06_React_Axios_API`](./Assignment_06_React_Axios_API/) | Axios API Integration with Loading & Error States | React.js, Axios, Vite | ✅ Completed |
| **07** | [`Assignment_07_React_Controlled_Form`](./Assignment_07_React_Controlled_Form/) | Controlled Components Registration Form with Regex Validation | React.js, Vite, CSS Modules | ✅ Completed |
| **08** | [`Assignment_08_PHP_MySQL_CRUD`](./Assignment_08_PHP_MySQL_CRUD/) | Student Management System with CRUD & MySQL | PHP 8, MySQL, XAMPP, Bootstrap 5 | ✅ Completed |
| **09** | [`Assignment_09_Node_Express_REST_API`](./Assignment_09_Node_Express_REST_API/) | RESTful Backend Server with Static Files & Student CRUD | Node.js, Express.js, Postman | ✅ Completed |
| **10** | [`Assignment_10_Node_MongoDB_Serverless`](./Assignment_10_Node_MongoDB_Serverless/) | MongoDB Mongoose CRUD + Serverless Summary Function | Node.js, Express, Mongoose, Vercel Serverless | ✅ Completed |
| **11** | [`Assignment_11_JWT_Authentication`](./Assignment_11_JWT_Authentication/) | Server-Side User Auth with JWT, Bcrypt & Protected Routes | Node.js, Express, JWT, MongoDB | ✅ Completed |

---

## 🚀 Quick Setup Instructions

### Frontend Assignments (01 to 04)
- **Assignments 1 to 3**: Simply open `index.html` in any browser or launch with Live Server.
- **Assignment 4 (TypeScript)**: Run `npm install` and `npm run build` or `npm start` (or open `index.html` directly).

### React Assignments (05 to 07)
Inside each React assignment directory:
```bash
npm install
npm run dev
```

### PHP & MySQL Assignment (08)
- Move or link `Assignment_08_PHP_MySQL_CRUD` to your XAMPP `htdocs` directory (`C:/xampp/htdocs/`).
- Import `database.sql` into phpMyAdmin (`http://localhost/phpmyadmin`).
- Access at `http://localhost/Assignment_08_PHP_MySQL_CRUD/`.

### Node.js & MongoDB Assignments (09 to 11)
Inside each backend directory:
1. Run `npm install`.
2. Configure `.env` file with your **MongoDB Atlas Connection URI**:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.bl9w4jd.mongodb.net/college_db?retryWrites=true&w=majority
   JWT_SECRET=sanjivani_engineering_super_secret_jwt_key_2026
   ```
3. Start the server:
   ```bash
   npm start
   # or for development:
   npm run dev
   ```

---
*Created for Academic Continuous Internal Assessment & Laboratory Submissions.*
