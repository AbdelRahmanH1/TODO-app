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

2. Install dependencies:
   ```bash
   cd todo-app
   npm install

3. Create a `.env` file in the root directory and configure environment variables:
```bash
  PORT=3000
  DB_USERNAME=your_database_username
  DB_PASSWORD=your_database_password
  DB_NAME=todo_db
  JWT_SECRET=your_jwt_secret

