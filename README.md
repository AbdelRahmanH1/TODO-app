# Todo App

The Todo App is a simple web application built with Express.js and Sequelize ORM, designed to help users manage their tasks efficiently.

## Features

- **User Authentication:** Users can create an account, log in, edit their account details, and delete their account.
- **Task Management:** Users can create, update, delete, and mark tasks as completed. They can also view all their tasks or specific tasks.

## Technologies Used

- **Express.js:** A minimalist web framework for Node.js used for handling HTTP requests.
- **Sequelize:** A promise-based ORM for Node.js used for interacting with the PostgreSQL database.
- **Bcrypt:** A library for hashing passwords to ensure secure user authentication.
- **PostgreSQL (pg):** A powerful open-source relational database used for storing user accounts and tasks.
- **dotenv:** A module for loading environment variables from a `.env` file into `process.env`.
- **jsonwebtoken:** A library for generating and verifying JSON Web Tokens (JWTs) used for user authentication.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/todo-app.git

Usage
User Authentication:
Register a new user: Send a POST request to /api/auth/register with username and password in the request body.
Log in: Send a POST request to /api/auth/login with username and password in the request body. This will return a JWT token.
Edit user account: Send a PUT request to /api/users/:id with the updated user details in the request body. You need to be authenticated and authorized to edit your own account.
Delete user account: Send a DELETE request to /api/users/:id. You need to be authenticated and authorized to delete your own account.
Task Management:
Create a task: Send a POST request to /api/tasks with title and optional description and deadline in the request body. You need to be authenticated to create a task.
Update a task: Send a PUT request to /api/tasks/:id with the updated task details in the request body. You need to be authenticated and authorized to edit your own tasks.
Delete a task: Send a DELETE request to /api/tasks/:id. You need to be authenticated and authorized to delete your own tasks.
Get all tasks: Send a GET request to /api/tasks. You need to be authenticated to retrieve your tasks.
Get a specific task: Send a GET request to /api/tasks/:id. You need to be authenticated and authorized to access your own tasks.
Mark a task as completed: Send a PUT request to /api/tasks/:id/complete. You need to be authenticated and authorized to mark your own tasks as completed.
