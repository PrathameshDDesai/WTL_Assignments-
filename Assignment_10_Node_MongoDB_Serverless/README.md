# Assignment 10: MongoDB Mongoose CRUD & Serverless Summary Function

[![Live Demo](https://img.shields.io/badge/Render-Live%20Demo-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://wtl-assignment-10-mongodb.onrender.com/)

**🌐 Live Deployment URL:** [https://wtl-assignment-10-mongodb.onrender.com/](https://wtl-assignment-10-mongodb.onrender.com/)

---

## 1. Title
Connect a Node.js backend to MongoDB using Mongoose, implement student CRUD operations via Express routes, and implement an independent Serverless Function (Vercel/Netlify compatible) for read-only analytical summaries.

## 2. Objectives
- To connect a Node.js server to MongoDB Atlas using the Mongoose Object Data Modeling (ODM) library.
- To design a strongly-validated Mongoose Schema with data constraints, enums, regexes, and virtual indices.
- To implement Express.js RESTful CRUD endpoints with async/await and Mongoose model queries.
- To architect a Serverless Function (`api/summary.js`) utilizing connection pooling to aggregate read-only summary metrics (total students, average CGPA, top performers).

## 3. Problem Statement
Connect a Node.js backend to MongoDB using Mongoose. Create a schema for student data and implement CRUD operations through Express.js routes. In addition, implement a serverless function (deployed on Vercel or Netlify) that connects to the same MongoDB database and provides read-only access to summary information, such as the total number of students or a list of top-performing students.

## 4. Theoretical Concepts
1. **Mongoose ODM**: Provides schema-based modeling, type casting, validation, and middleware (hooks) over raw MongoDB drivers.
2. **Serverless Architecture**: Stateless compute units (AWS Lambda / Vercel Functions) that spin up on-demand to execute discrete tasks.
3. **Connection Pooling in Lambdas**: Global connection caching (`cachedDb`) prevents database connection timeouts and starvation during serverless cold/warm invocations.
4. **MongoDB Aggregation Pipeline**: Multi-stage operations (`$group`, `$avg`, `$sort`, `$project`) processed natively on the database cluster.

## 5. Configuration & Setup Instructions

### Step 1: Configure MongoDB Atlas URI in `.env`
Open [`.env`](./.env) and paste your MongoDB Atlas connection string:
```env
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0.mongodb.net/college_db?retryWrites=true&w=majority
PORT=5000
```

### Step 2: Install Dependencies & Run
```bash
cd Assignment_10_Node_MongoDB_Serverless
npm install
npm start
```

### Step 3: Endpoints Available
- **Live Render Web Dashboard**: `https://wtl-assignment-10-mongodb.onrender.com/`
- **MongoDB CRUD Endpoint**: `https://wtl-assignment-10-mongodb.onrender.com/api/students`
- **Serverless Summary Function**: `https://wtl-assignment-10-mongodb.onrender.com/api/summary`

## 6. Test Cases
| Test ID | Method | Endpoint | Description | Expected Status |
|:---|:---|:---|:---|:---|
| TC_01 | GET | `/api/summary` | Query serverless summary function | `200 OK` (Total count, average CGPA, top 5 students) |
| TC_02 | POST | `/api/students` | Create student document in MongoDB | `201 Created` (Stored with `_id` and timestamps) |
| TC_03 | POST | `/api/students` | Create student with invalid CGPA (-1 or 12) | `400 Bad Request` (Mongoose validation error) |
| TC_04 | GET | `/api/students` | List all documents from MongoDB | `200 OK` |
| TC_05 | PUT | `/api/students/:id`| Update CGPA or skills | `200 OK` |
| TC_06 | DELETE | `/api/students/:id`| Delete document by ObjectId | `200 OK` |

## 7. Conclusion
Successfully integrated Node.js with MongoDB Atlas using Mongoose ODM for CRUD operations, and implemented a serverless function providing aggregated read-only analytics.

## 8. References
- Mongoose Official Documentation: https://mongoosejs.com/docs/
- Vercel Serverless Functions: https://vercel.com/docs/functions
