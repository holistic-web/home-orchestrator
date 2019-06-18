# Orchestration UI
This is the user interface for this project, written in Vue.js.

It hosted at: [https://holistic-home-5134d.web.app](https://holistic-home-5134d.web.app)

## Architecture

### Account
The account section consists of the login page, login is done through firebase with Google authentication. Once authenticated the account store in vuex confirms that the user is on the approved list of unique id's in firebase.

### Lights
Allows the user to see the stored state of lights and set them using the `updateLights` cloud function.

### Themes
Allows a user to manage and apply themes, which are pre saved states of how things should be. Creating themes is managed with the `createTheme` cloud function.


## Getting Started
To get the project up and running:

1. Ensure [Node.js](https://nodejs.org) is installed on the development machine
2. Open a terminal and change directory to this folder
3. Run `npm install` to install project dependencies
4. Run `npm run serve` to host the project locally

## Hosting and Deployment
It is deployed under on the firebase project 'Home Orchestrator'. Raise an issue if you don't have access.

To deploy the project:
1. Ensure the steps in 'Getting started' all complete succesfully
2. Run `npm run build` from this folder to generate the build
3. Run `firebase deploy` to update the live deployment with the generated build