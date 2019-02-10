# Home Orchestrator
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
	- users can apply themes to rooms
- update setup with info on how to
	- create firebase database
	- create ifttt triggers (for iot buttons and lights)
- if possibly integrate with google homegraph / apple homekit
- add direct to device controllers to reduce response times

// #Todo:
// - import vuetify
// - debug imports to get site working
// - enable google logins swap log in over to using google
// - add database and api resources for authorized users
// - add collection of allowed user ids & redirect if user account not on allowed list
// - change colourscheme of site
// - 1. a page to allow the current lights to be modified and set with inputs
// - 2. a page to create a room by configuring light names and light types
// - 3. on a page generated to control the lights in each room, the user can save the current configuration as a theme
// - 4. themes can be modified and applied to rooms
// - 5. a page listing existing buttons and allowing the user to change the functionality of each button (toggle off, rotate scenes)
