# Assignment 11: Server-Side User Authentication with JWT & Protected Routes

[![Live Demo](https://img.shields.io/badge/Render-Live%20Demo-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://wtl-assignment-11-jwt-auth.onrender.com/)

**🌐 Live Deployment URL:** [https://wtl-assignment-11-jwt-auth.onrender.com/](https://wtl-assignment-11-jwt-auth.onrender.com/)

---

## 1. Title
Implement server-side user authentication using JSON Web Tokens (JWT), password hashing via Bcrypt, and role-protected API routes using Node.js, Express.js, and MongoDB.

## 2. Objectives
- To understand the mechanics of stateless authentication using JSON Web Tokens (JWT).
- To secure user passwords using Bcrypt salted cryptographic hashing (`bcryptjs`).
- To create Express authentication middleware that intercepts requests, validates Authorization Bearer tokens, and extracts authenticated user state.
- To implement Role-Based Access Control (RBAC) to restrict endpoints based on user roles (`student`, `faculty`, `admin`).

## 3. Problem Statement
Implement server-side user authentication with JWT and protected routes using Node.js, Express, and MongoDB. Protect endpoints such that unauthorized users without tokens or users with invalid/expired tokens receive standard `401 Unauthorized` or `403 Forbidden` responses.

## 4. Theoretical Concepts
1. **JSON Web Token (JWT) Structure**:
   - **Header**: Signing algorithm (`HS256`) and token type.
   - **Payload**: Claims (`id`, `role`, `exp`).
   - **Signature**: HMAC SHA256 hashed with a secret key: `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)`.
2. **Stateless vs. Session-Based Auth**: No server-side session lookup table is stored in RAM or DB; identity is cryptographically verified on each request.
3. **Bcrypt Salt & Hash**: Adds random cryptographic salt strings before one-way hashing to defend against rainbow table attacks.
4. **Bearer Token Standard**: Delivered via HTTP header:
   ```http
   Authorization: Bearer <jwt_token_string>
   ```

## 5. Execution & Testing Instructions

### Step 1: Configure MongoDB Atlas in `.env`
Open [`.env`](./.env) and paste your MongoDB Atlas connection string:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auth_db?retryWrites=true&w=majority
JWT_SECRET=sanjivani_engineering_super_secret_jwt_key_2026
JWT_EXPIRES_IN=7d
```

### Step 2: Install Dependencies & Launch
```bash
cd Assignment_11_JWT_Authentication
npm install
npm start
```

### Step 3: Interactive Browser Console
Navigate to [https://wtl-assignment-11-jwt-auth.onrender.com/](https://wtl-assignment-11-jwt-auth.onrender.com/) in your browser:
1. Fill the registration form to register and automatically store a signed JWT.
2. Click any of the protected route buttons:
   - `/api/auth/profile`
   - `/api/academic/dashboard`
   - `/api/academic/admin-portal`
3. Click "Clear" to discard the token, then re-click the protected routes to witness immediate `401 Unauthorized` rejection!

### Step 4: Testing via Postman
Import [`postman_collection.json`](./postman_collection.json) into Postman. Requests 1 and 2 auto-save the generated token into the collection's `jwt_token` variable, so subsequent requests authenticate automatically.

## 6. Test Cases
| Test ID | Endpoint | Method | Header | Expected Result | Status |
|:---|:---|:---|:---|:---|:---|
| TC_01 | `/api/auth/register` | POST | None | Account created with salted hash password; returns JWT | Passed |
| TC_02 | `/api/auth/login` | POST | None | Password verified; returns JWT token | Passed |
| TC_03 | `/api/auth/profile` | GET | `Authorization: Bearer <valid_jwt>` | Returns user profile details (`200 OK`) | Passed |
| TC_04 | `/api/auth/profile` | GET | Missing Token | `401 Unauthorized` ("No Bearer token provided") | Passed |
| TC_05 | `/api/auth/profile` | GET | `Authorization: Bearer invalid123` | `401 Unauthorized` ("Invalid or expired token") | Passed |
| TC_06 | `/api/academic/admin-portal` | GET | Bearer token for role `student` | `403 Forbidden` ("Role 'student' not authorized") | Passed |

## 7. Conclusion
Successfully implemented an end-to-end server-side authentication system utilizing JSON Web Tokens (JWT), Bcrypt password hashing, and custom middleware for protected routes and role-based access control.

## 8. References
- JWT Official Standard (RFC 7519): https://jwt.io/
- Bcrypt.js Security Documentation
