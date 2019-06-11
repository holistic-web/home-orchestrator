# Home Orchestrator
This is a project to manage home tasks and automation.

## Architecture
- [.project](/.project): _files relating to the project, including the roadmap_
- [cloud-functions](/cloud-functions): _cloud functions acting as a serverless API_
- [database](/database): _the configuration for the database_
- [orchestration-ui](/orchestration-ui): _user interface through which one can orchestrate the home_

#Todo:
- add collection of allowed user ids & redirect if user account not on allowed list
- change colourscheme of site
- add favicon to site
- 1. a page to allow the current lights to be modified and set with inputs
- 2. a page to create a room by configuring light names and light types
- 3. on a page generated to control the lights in each room, the user can save the current configuration as a theme
- 4. themes can be modified and applied to rooms
- 5. a page listing existing buttons and allowing the user to change the functionality of each button (toggle off, rotate scenes)
