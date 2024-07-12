# Mavers Project

Brief description of your project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Firebase Configuration](#firebase-configuration)
- [Contributing](#contributing)
- [License](#license)

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

  Replace values with your actual MongoDB URI, access token secret, and Firebase service account key path.

4. **Start the Server**
   ``` bash
   npm start

# Usage
 This application  uses role base authentication and authorization.
 An administrator has the sole responsibility to create and modify user accounts, tasks and assign tasks to each staff member 

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
```

Replace 'https://your-project-id.firebaseio.com' with your Firebase project's database URL.