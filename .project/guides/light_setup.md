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
		}
	}
	```

