# NodeJs Todo with Auth

**Features**

- Login
- Signup
- CRUD a todo (Need login to CUD)

**What used**  
Back-end : Node.js, Express.js  
Data fetching : Mongoose 
Authentication : JWT

**Pre-work**

- Node.js must be installed in your computer.
- Mongoose Atlas DB account.

**How to run**

1. Clone or download project
2. Go to the project directory in command prompt
3. Install dependencies -> "npm install"
4. Run app -> "npm start"
5. Load "localhost:3000" in web browser/postman

**API Endpoints**

***Users***
```
get: /users
login: users/login
signup: /users/signup
delete: /users/:userID
```
***To-do's (auth required)***
```
get: /tasks
post: /tasks
update: /tasks/:taskID
delete: /tasks/:taskID
```
