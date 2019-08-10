# Light Setup
This document will guide you through setting up lights with the Home Orchestrator system.

1. Firstly go to the database at: https://console.firebase.google.com/project/holistic-home-5134d/database/firestore/data~2Fnetworks and select your network. If there is not already a `lights` subcollection you'll need to create one by clicking the `Start Collection` button within your network.

1. Add your light to the `lights` collection in the firestore database. An item should look like:

	```
	Document ID: {Auto-ID}
	{
		_id: {Auto-ID}, // String (matching the generated ID above)
		name: {light name}, // String (lowercase and no spaces)
		type: {light type}, // String (either 'hue' or 'nanoleaf')
		state: { // Map
			on: false // Boolean
		}
	}
	```

1. At this point you'll need an account with IFTTT to manage your light, if you don't have one already you can create one here: https://ifttt.com/join

2. Next, go to [IFTT](https://ifttt.com) and create an account, this is where you'll need to create your triggers. The triggers you'll need to create are:
	- webhooks:
		- `{name}-turn-on`: on webrequest that listens for `{name}-turn-on` event and turns the relevant light on
		- `{name}-turn-off`: on webrequest that listens for `{name}-turn-off` event and turns the relevant light off
		- `{name}-set-colour`: on webrequest that listens for `{name}-set-colour` event and turns the relevant light to the colour of `value1`
		- `{name}-set-brightness`: on webrequest that listens for `{name}-set-brightness` event and turns the relevant light to the brightness of `value1`.

That should do it!