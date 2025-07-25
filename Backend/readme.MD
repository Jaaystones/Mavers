# Mavers Project

Brief description of your project.

## Table of Contents

- [Project](#Project Tree)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Firebase Configuration](#firebase-configuration)
- [Contributing](#contributing)
- [License](#license)

## Project Tree

    ```bash
    root
    ├── config
    │   ├── allowedOrigins.js
    │   ├── corsOptions.js
    │   ├── dbConfig.js
    │   ├── firebaseAdmin.js
    │   ├── firebaseConfig.json
    │   └── imageCloudConfig.js
    ├── controllers
    │   ├── authController.js
    │   ├── passwordControllers.js
    │   ├── reminderController.js
    │   ├── taskController.js
    │   └── userController.js
    ├── docs
    ├── logs
    │   ├── errLog.log
    │   ├── mongoErrLog.log
    │   └── reqLog.log
    ├── middleware
    │   ├── authMiddleware.js
    │   ├── errorHandler.js
    │   ├── logger.js
    │   └── loginLimiter.js
    ├── models
    │   ├── Reminder.js
    │   ├── Task.js
    │   ├── Token.js
    │   └── User.js
    ├── public
    │   └── css
    │       └── style.css
    ├── routes
    │   ├── authRoutes.js
    │   ├── passwordRoutes.js
    │   ├── reminderRoutes.js
    │   ├── root.js
    │   ├── taskRoutes.js
    │   └── userRoutes.js
    ├── uploads
    │   └── <uploaded files>
    ├── utils
    │   ├── emailSender.js
    │   ├── imageUploads.js
    │   ├── reminderCal.js
    │   └── sendReminders.js
    ├── views
    │   ├── 404.html
    │   └── index.html
    ├── .gitignore
    ├── .env
    ├── app.js
    ├── package.json
    ├── package-lock.json
    ├── Readme.MD
    ├── test_data.txt
    ├── user_story.md

````

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com//repository.git
   cd repository

2. **Install dependencies:**
   ```bash
   npm install

3. **Setup the .env file:**
    ```bash
        PORT=3500
        NODE_ENV=development
        MONGODB_URI=mongodb://localhost:27017/your_database
        ACCESS_TOKEN_SECRET=your_access_token_secret
        FIREBASE_SERVICE_ACCOUNT_KEY=path/to/serviceAccountKey.json
    ```

  Replace values with your actual MongoDB URI, access token secret, and Firebase service account key path.


4. **Start the Server**
   ```bash
   npm start

5. **API Documentation (Swagger UI)**
   - After starting the server, visit [http://localhost:3500/api-docs](http://localhost:3500/api-docs) in your browser to view the interactive Swagger API documentation.
   - The OpenAPI spec is located in the `docs/swagger.json` file. Update this file to document your endpoints.

# Usage
This application uses role-based authentication and authorization.
The authentication process utilizes JWT webtokens, which are added to the authorization header of the client application.
The authorization process is handled using an authorization middleware which checks for respective roles and grants access accordingly.
An administrator has the sole responsibility to create and modify user accounts, tasks, and assign tasks to each staff member.

# Api Routes

**Authentication:**

    `POST /api/auth/login`: Login with username and password.
    `POST /api/auth/register`: Register a new user.
    `POST /api/auth/logout`: Log out
    `GET /api/auth/refresh`: Refresh the application

**Users:**

    `GET /api/users`: Get all users.
    `GET /api/users/:id`: Get user by ID.
    `PATCH /api/users/:id`: Update user by ID.
    `DELETE /api/users/:id`: Delete user by ID.

**Tasks:**

    `POST /api/tasks`: Create a new task.
    `GET /api/tasks:` Get all tasks.
    `GET /api/tasks/:id`: Get task by ID.
    `PUT /api/tasks/:id`: Update task by ID.
    `DELETE /api/tasks/:id`: Delete task by ID.

**Reminders:**


# Firebase Configuration

## Firebase Admin SDK:

Download the service account key JSON file from Firebase Console and place it in your project directory.

## Update firebaseConfig.js:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'
});

module.exports = admin;
````

Replace 'https://your-project-id.firebaseio.com' with your Firebase project's database URL.
