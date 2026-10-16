# Assignment 09: Node.js & Express.js RESTful API Backend Server

## 1. Title
Write code using Node.js and Express.js to create a back-end server serving static files and JSON routes, then implement a complete RESTful API with GET, POST, PUT, and DELETE operations for student data, verified using Postman.

## 2. Objectives
- To configure an HTTP server using Node.js and Express.js.
- To utilize Express middleware (`express.static`, `express.json`, `cors`).
- To architect RESTful API endpoints complying with standard HTTP request methods and status codes:
  - `200 OK` (Fetch/Update/Delete)
  - `201 Created` (Creation)
  - `400 Bad Request` (Missing fields)
  - `404 Not Found` (Resource not found)
  - `409 Conflict` (Duplicate record)
- To perform comprehensive testing using Postman.

## 3. Problem Statement
Write code using Node.js and Express.js to create a back-end server. Create basic routes to serve static files and JSON data, then extend it to include a RESTful API with GET, POST, PUT, and DELETE operations for a student data object. Test all routes using Postman.

## 4. Theoretical Concepts
1. **REST Architectural Constraints**: Statelessness, uniform interface, resource-oriented URIs using plural nouns (`/api/students`).
2. **HTTP Verb Semantics**:
   - `GET`: Safe, idempotent retrieval of resource representations.
   - `POST`: Create subordinate resources.
   - `PUT`: Update/replace existing resource state.
   - `DELETE`: Remove resource from server storage.
3. **Middleware**: Pipeline of functions executing sequentially before final route handlers (parsing request body, logging, CORS headers, serving static bundles).

## 5. Execution & Testing Instructions

### Step 1: Install Dependencies & Run
```bash
cd Assignment_09_Node_Express_REST_API
npm install
npm start
```
The server will start on `http://localhost:5000`.

### Step 2: Test in Browser & Static UI
Open `http://localhost:5000/` in any browser to interact with the static testing dashboard.

### Step 3: Test with Postman
1. Launch Postman.
2. Click **Import** > Select [`postman_collection.json`](./postman_collection.json).
3. Execute the pre-configured requests:
   - `GET /api/info`
   - `GET /api/students`
   - `GET /api/students/1`
   - `POST /api/students` (Pass JSON body)
   - `PUT /api/students/2` (Update details)
   - `DELETE /api/students/3` (Delete)

## 6. Test Cases
| Test ID | Method | Endpoint | Request Body | Expected HTTP Status |
|:---|:---|:---|:---|:---|
| TC_01 | GET | `/` | None | `200 OK` (Serves `index.html`) |
| TC_02 | GET | `/api/students` | None | `200 OK` (Array of students) |
| TC_03 | GET | `/api/students/999` | None | `404 Not Found` |
| TC_04 | POST | `/api/students` | `{"rollNo":"2023COMP88","name":"Sameer",...}` | `201 Created` |
| TC_05 | POST | `/api/students` | Missing `email` or `rollNo` | `400 Bad Request` |
| TC_06 | PUT | `/api/students/2` | `{"gpa": 9.40}` | `200 OK` (Updated object) |
| TC_07 | DELETE | `/api/students/3` | None | `200 OK` (Deleted confirmation) |

## 7. Conclusion
Successfully implemented an Express.js backend server serving static files, JSON information routes, and a RESTful student management API with input validation and HTTP status codes.

## 8. References
- Express.js Documentation: https://expressjs.com/
- Postman API Platform: https://www.postman.com/
