# Holistic Home
This is a node.js app to manage home tasks and automation.

It creates a firebase database to manage the state of your home. Then adds listeners to that database to enact changes on devices.

## Setup
1. Create a database on the firebase console.
2. Create an email / password user account
3. Set up relevant IFTTT triggers
4. Setup cloud environment variable `ifttt.key` with: `firebase functions:config:set ifttt.key="YOUR-API-KEY"`

### Running the app
Ensure `firebase deploy` has been run to setup to device controller

## Roadmap
- fix repo linting
- create a ui in which:
	- users can add new lights to the home
	- users can setup themes
	- users can setup alarms
- update setup with info on how to
	- create firebase database
	- create ifttt triggers (for iot buttons and lights)
- if possibly integrate with google homegraph / apple homekit
- add direct to device controllers to reduce response times