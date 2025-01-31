# Node.js Backend Boilerplate

This boilerplate code for Node.js backend provides a complete starting point for developers who want to quickly create a backend project. It includes the following features:

- **Express:** A popular web framework for Node.js that simplifies the process of building web applications.
- **TypeORM:** An ORM for Node.js that supports PostgreSQL, MySQL, SQLite, and more.
- **Pino Logger:** A fast and lightweight logger for Node.js applications.
- **ESLint:** A widely-used linter that helps developers identify and fix problems in their code.
- **Env Config:** A module for managing environment variables in Node.js applications.
- **Git-cz:** A commitizen tool for standardizing commit messages.
- **Typescript:** A superset of JavaScript that adds static typing and other features to the language.
- **Folder Structure:** A well-organized and intuitive file structure that makes it easy for developers to navigate and understand the project.
- **Swagger Setup:** A tool for creating and documenting RESTful APIs.
- **Authentication and Authorization:** Built-in authentication and authorization using JSON Web Tokens (JWT) and bcrypt for password hashing.

The boilerplate code is designed to provide developers with everything they need to get started with backend development, including a file structure, example routes, and a basic implementation of each of the features listed above. Developers can use this boilerplate code as a starting point for their own backend projects, saving time and effort in the development process.

To get started with the boilerplate code, follow the installation instructions below:

## Technologies Used

- **TypeScript**: A superset of JavaScript that adds static typing and other features to the language.
- **Express.js**: A popular web framework for Node.js that simplifies the process of building web applications.
- **TypeORM**: An ORM for Node.js that supports PostgreSQL, MySQL, SQLite, and more.
- **Pino Logger**: A fast and lightweight logger for Node.js applications.
- **ESLint**: A widely-used linter that helps developers identify and fix problems in their code.
- **Git-cz**: A commitizen tool for standardizing commit messages.
- **Folder Structure**: A well-organized and intuitive file structure that makes it easy for developers to navigate and understand the project.
- **Swagger**: A tool for creating and documenting RESTful APIs.
- **JSON Web Tokens (JWT)**: A standard for securely transmitting information between parties as a JSON object.

## Installation Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/waferelectronics/node-backend-boilerplate.git

2. Navigate to the project directory:
    
   ```bash
   cd node-backend-boilerplate
   ```
3. Install the dependencies:
    
   ```bash
   npm i
   ```
   or

    ```bash
    yarn
    ```
4. Create an .env.development file based on the env.example file in the root directory and update the variables according to your preferences:
    
   ```bash
   cp env.example .env.development
   ```
   Update the following environment variables in the env.development file to reflect your database configuration:
   ```bash
   DATABASE_HOST=<your-database-host>
   DATABASE_PORT=<your-database-port>
   DATABASE_USER=<your-database-user>
   DATABASE_PASSWORD=<your-database-password>
   DATABASE_NAME=<your-database-name>
   ```

5. Start the development server:
    
    ```bash
    npm run start
    ```
    or
    ```bash
    yarn start
    ```
    
Note: Before starting the server, make sure that your database server is up and running, and you have created a database as specified in the DATABASE_NAME variable of the env.development file.


## Project Structure

This project follows a standard Node.js application structure with Typescript. The root directory contains configuration files and scripts. The `src` directory contains the application's source code, divided into several subdirectories:

- `bootstraps`: Contains files that bootstrap the application, such as `server.ts`, `database.ts`, and `logger.ts`.
- `controllers`: Contains the application's controllers. Currently, it only includes `auth.controller.ts`.
- `docs`: Contains the documentation files for the application, including both Swagger-related files and other documentation files.
    - `swagger`: Contains the Swagger specification files, such as `auth.doc.ts` and `auth.schema.ts`.
- `errors`: Contains custom error classes, such as `ExpressError`.
- `libs`: Contains utility classes, constants, enums, and the database models. This directory is divided into subdirectories:
    - `constants`: Contains application-wide constants.
    - `database`: Contains the database entities and entity subscribers.
    - `enums`: Contains application-wide enums.
- `middlewares`: Contains middleware functions used in the application, such as authorization middleware and input validation middleware.
- `routes`: Contains the application's routes, divided into files such as `auth.route.ts`.
- `services`: Contains the services used in the application. This could include both services that the backend provides and services that it consumes.
- `types`: Contains custom type definitions.
- `utils`: Contains utility functions used throughout the application, such as JWT utility functions.

The `tsconfig.json` file contains the TypeScript compiler configuration, and the `package.json` files contain the application's dependencies and scripts.