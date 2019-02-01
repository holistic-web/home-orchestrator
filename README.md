# Holistic Home
This is a node.js app to manage home tasks and automation.

It creates a firebase database to manage the state of your home. And listeners to that database to enact changes on devices.

## Setup
1. Create a database on the firebase console.
2. Create an email / password user account
3. update `database.rules.json` to only allow this user id to read / write to the database
4. add `FIREBASE_EMAIL` and `FIREBASE_PASSWORD` as environment variables. (dotenv is installed so a .env file will work).
5. In the config folder modify to suit your setup.

### Running the app
In this folder, run `npm install` to install the required dependencies followed by `npm start` to begin the app.

## Roadmap
- set lights to a specific colour on api request
- fix repo linting
- user can add lights to the home
- current state of lights stored in firebase