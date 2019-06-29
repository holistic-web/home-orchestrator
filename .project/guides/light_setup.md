# Light Setup
This document will guide you through setting up lights with the Home Orchestrator system.

1. First, add an item to the `/lights` collection in the firestore database. An item should look like:
	```
	{auto-id}: {
		_id: {auto-id},
		name: 'new light 1',
		type: 'hue',
		state: {
			on: false
		},
		key: 'IFTT_SECRET_KEY'
	}
	```

2. Next, go to [IFTT](https://ifttt.com) and create an account, this is where you'll need to create your triggers. The triggers you'll need to create are:
	- webhooks:
		- `{name}-turn-on`: on webrequest that listens for `{name}-turn-on` event and turns the relevant light on
		- `{name}-turn-off`: on webrequest that listens for `{name}-turn-off` event and turns the relevant light off
		- `{name}-set-colour`: on webrequest that listens for `{name}-set-colour` event and turns the relevant light to the colour of `value1`
		- `{name}-set-brightness`: on webrequest that listens for `{name}-set-brightness` event and turns the relevant light to the brightness of `value1`.

That should do it!