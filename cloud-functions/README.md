# Cloud Functions
These are the cloud functions for this project, hosted on Firebase.

### Deploying
Ensure `firebase-tools` is installed globally and then run `firebase deploy` from this folder.

## Authentication
Authentication is currently managed by checking against an array approved of user ids.

## Functions

### Update Lights
Allows a user to update the lights and the corresponding database values.

It currently uses IFTTT triggers to control the lights, they are:
- _{lightName}_-turn-on
- _{lightName}_-turn-off
- _{lightName}_-set-scene-_{sceneName}_
- _{lightName}_-set-brightness
- _{lightName}_-set-colour

### Create Theme
Allows a user to create a theme and adds it to the themes store.