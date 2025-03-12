# FLIXIT

FLIXIT is a full-stack web application featuring a React front end and a NestJS back end.

## Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Front End (React)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the `front_flixit` directory, you can run:

#### `npm install`
Installs all dependencies.

#### `npm start`
Runs the app in development mode.
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm test`
Launches the test runner in interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run eject`
**Note: This is a one-way operation. Once you `eject`, you can’t go back!**

## Back End (NestJS)

The application uses PostgreSQL as its database, but no database-related content or configurations are provided, as it pertains to streaming content, which is legally restricted.

The back end is built using [NestJS](https://nestjs.com/), a progressive Node.js framework.

### Available Scripts

In the `back_flixit` directory, you can run:

#### `npm install`
Installs all dependencies.

#### `npm run start`
Runs the NestJS server in development mode.
The API will be available at [http://localhost:8080](http://localhost:8080) (or another configured port).

#### `npm run start:dev`
Runs the NestJS server with hot-reloading enabled for development.

#### `npm run build`
Compiles the application for production.

#### `npm run start:prod`
Runs the compiled production build.

## Running the Full Stack Application

1. Open two terminals.
2. Navigate to the `back_flixit` directory and run:
   ```sh
   npm install
   npm run start
   ```
3. In another terminal, navigate to the `front_flixit` directory and run:
   ```sh
   npm install
   npm start
   ```
4. The front end will be available at [http://localhost:8081](http://localhost:8081) and the API at [http://localhost:8080](http://localhost:8080).

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [NestJS Documentation](https://docs.nestjs.com/)