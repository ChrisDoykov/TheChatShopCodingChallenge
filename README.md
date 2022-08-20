# GraphQL Sample Application

This application is intended to showcase how a basic Apollo Server GraphQL implementation can communicate and make use of a microservice-based architecture. The schema consists of a single query, namely "getFact" which is used to retrieve a random fact from an API. It requires the user to provide a valid email address for demo purposes only, the email is not actually used.

## IMPORTANT

The ENV file required to run this implementation has been sent over inside the email with subject "Coding Challenge - Kristiyan Nikolov Doykov" and needs to be placed at the root of teh directory, alongside the `src` folder.

## Installing

Before running the application, navigate to the root directory of the project using a terminal and execute the `npm install` command to install all of the necessary modules.

## Running

In order to run the development environment, please use `npm run start:dev`. Once the server is running open `http://localhost:4000/` in your browser and use the Apollo Sandbox environment to fire off the `getFact` query by providing a sample email address such as "test@mail.com" under the `email` variable.

## Testing

In order to run the test suite please use `npm run test`.
