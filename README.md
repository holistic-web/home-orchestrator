# Holistic Home
This is a node.js app to manage home tasks and automation.

## Setup

### IFTTT
Set up webhook applets on https://platform.ifttt.com and configure triggers for endpoints in `/config/lights.js`.

### Running the app
In this folder, run `npm install` to install the required dependencies followed by `npm start` to begin the app.

## Environment Variables
Since we have `dotenv` installed loading environment variables into a .env file makes them automagically available.
- SET_BRIGHTNESS_ENDPOINT: the endpoint at which your ifttt trigger is listening on

## Roadmap
- set lights to a specific colour on api request
- fix repo linting
- user can add lights to the home