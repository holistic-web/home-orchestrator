w# Cloud Functions
These are the cloud functions for this project, hosted on Firebase. If they haven't been used in a while it make ~15 seconds for the project to spin up.

### Deploying
Ensure `firebase-tools` is installed globally and then run `firebase deploy` from this folder to deploy all functions.

## Authentication
Authentication is managed by checking is a user is present in the `users` collection and that they have the correct access rights.

## Functions
The total list of functions can be found in the functions folder in `index.js`. There are three core modules currently:
- users: `getUser`, `getUsers`, `createUser`, `updateUserRole`, `deleteUser`
- lights: `getLights`, `updateLights`
- themes: `getTheme`, `getThemes`, `createTheme`, `updateTheme`, `deleteTheme`