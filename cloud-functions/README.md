# Cloud Functions
This project uses cloud functions as a serverless api.

## Functions

### Update Lights
This is defined in `/functions/index` and allows a user to update the lights and the database values.

# IFTTT Triggers
We use multiple IFTTT triggers in this project, they are:
- _{lightName}_-turn-on
- _{lightName}_-turn-off
- _{lightName}_-set-scene-_{sceneName}_
- _{lightName}_-set-brightness
- _{lightName}_-set-colour

### Deploying
Ensure `firebase-tools` is installed globally and then run `firebase deploy` from this folder.