# Orchestration UI
This interface allows a user to set the lights. It is written in Vue.js.

It hosted at: [https://holistic-home-5134d.web.app](https://holistic-home-5134d.web.app)

## Architecture

### Containers

#### Account
The account section consists of the login page, login is done through firebase with Google authentication. Once authenticated the account store in vuex confirms that the user is on the approved list of unique id's in firebase.

#### Lights
The lights section allows the user to set the state of the lights by communicating with the cloud functions through vuex.

## Getting Started
To get the project up and running:

1. Ensure [Node.js](https://nodejs.org) is installed on the development machine
2. Open a terminal and change directory to this folder (`/portfolio-management/admin-ui/`)
3. Run `npm install` to install project dependencies
4. Run `npm run serve` to host the project locally
5. If you want to build the project (to deploy it), run `npm run build` and follow the instructions displayed


## Hosting and Deployment
This site is hosted on firebase project 'Portfolio Fabricator'. Raise an issue to gain access if you don't have it already.

It is deployed under the target name `portfolio-administration`, this can be seen in the Firebase Hosting Console.

To deploy the project:
1. Ensure the steps in 'Getting started' all complete succesfully
2. Run `npm run build` from this folder to generate the build
3. Run `firebase deploy` to update the live deployment with the generated build