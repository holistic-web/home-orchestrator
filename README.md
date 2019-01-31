# Holistic Home
This is a node.js app to manage home tasks and automation.

## Setup

### IFTTT
Set up a webhook applet on https://platform.ifttt.com and configure it to set the lights to the value specified by `value1` ingredient.

### Running the app
In this folder, run `npm install` to install the required dependencies followed by `npm start` to begin the app.

## Environment Variables
- SET_BRIGHTNESS_ENDPOINT: the endpoint at which your ifttt trigger is listening on

## Roadmap
- set lights to a specific colour on api request