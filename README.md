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
    DATABASE_NAME=your_database_username
    DATABASE_PASS=your_database_password
    DATABASE_USER= todo_db
    JWT_SECRET=your_jwt_secret
    SALT_ROUND = number_salt
   Barrer_KEY= your_barrer_key

4. Run the application:
   ```bash
       npm run dev
5. Access the application in your web browser at `http://localhost:3000`.

## Usage

- **User Authentication:**
- Register a new user: Send a `POST` request to `/v1/user/signup` with `username` , `password` , `confirmpassword` and `email` in the request body.
- Log in: Send a `POST` request to `/v1/user/login` with `username` and `password` in the request body. This will return a JWT token.
- Edit user account: Send a `PUT` request to `/v1/user/:id` with the updated user details in the request body. You need to be authenticated and authorized to edit your own account.
- Delete user account: Send a `DELETE` request to `/v1/user/`. You need to be authenticated and authorized to delete your own account with token on header.
- **Task Management:**
- Create a task: Send a `POST` request to `/v1/tasks` with `title` and optional `description` and `deadline` in the request body. You need to be authenticated to create a task.
- Update a task: Send a `PUT` request to `/v1/tasks/:id` with the updated task details in the request body. You need to be authenticated and authorized to edit your own tasks.
- Delete a task: Send a `DELETE` request to `/v1/tasks/:id`. You need to be authenticated and authorized to delete your own tasks and authenticated with token.
- Get all tasks: Send a `GET` request to `/v1/tasks`. You need to be authenticated to retrieve your tasks.
- Get a specific task: Send a `GET` request to `/v1/tasks/:id`. You need to be authenticated and authorized to access your own tasks.
- Mark a task as completed: Send a `PATCH` request to `/api/tasks/complete/:id`. You need to be authenticated and authorized to mark your own tasks as completed.

## Contributing

Contributions are welcome! Feel free to fork the repository, create pull requests, and open issues.

## License

This project is licensed under the MIT License.







