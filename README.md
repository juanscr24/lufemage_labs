# Lufemage Labs

This project is a full-stack web application with a React frontend and an Express backend, built using TypeScript and Vite.

## Project Structure

- `src/`: Contains the React frontend source code, including pages, components, hooks, layouts, and styles.
- `services/`: Contains the Express backend source code, including routes, controllers, and database connection.
- `public/`: Static assets for the frontend.
- `package.json`: Project configuration and scripts.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

## Installation

Install all dependencies for both frontend and backend:

```bash
npm install
```

## Running the Project

### Backend

The backend server is an Express app running on port 3000.

To start the backend server:

```bash
npm run server
```

To start the backend server in watch mode (auto-restart on changes):

```bash
npm run server:dev
```

### Frontend

The frontend is a React app built with Vite.

To start the frontend development server:

```bash
npm run dev
```

This will start the frontend on [http://localhost:5173](http://localhost:5173) by default.

## Building the Project

To build both backend and frontend for production:

```bash
npm run build
```

## Linting

To run ESLint on the project files:

```bash
npm run lint
```

## Notes

- The backend API endpoints are prefixed with `/users` as defined in the Express routes.
- CORS is enabled on the backend to allow requests from the frontend development server.

## License

This project is private and not licensed for public use.
