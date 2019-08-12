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

1. You'll now need to create the triggers for your new light. This can be done at: https://ifttt.com/create. The triggers you'll need are:

	_In the below: replace `{LIGHT_NAME}` with the name of your light, so the trigger could be: `lamp-turn on`. Also name the triggers the same as their event name and opt out of receiving notifications when asked._

	- `{LIGHT_NAME}-turn-on`:

		```
			service: webhooks
			trigger: receive web request
			event name: {LIGHT_NAME}-turn-on
			action service: hue/nanoleaf
			action: turn on lights // select the correct light!
		```

	- `{LIGHT_NAME}-turn-off`:

		```
			service: webhooks
			trigger: receive web request
			event name: {LIGHT_NAME}-turn-off
			action service: hue/nanoleaf
			action: turn off lights
		```

	- `{LIGHT_NAME}-set-colour`:

		```
			service: webhooks
			trigger: receive web request
			event name: {LIGHT_NAME}-set-colour
			action service: hue/nanoleaf
			action: change colour
				color value or name: click add ingredient > value 1
		```

	- `{LIGHT_NAME}-set-brightness`:

		```
			service: webhooks
			trigger: receive web request
			event name: {LIGHT_NAME}-set-brightness
			action service: hue/nanoleaf
			action: dim lamp
				brighness: click add ingredient > value 1
		```

	- `{LIGHT_NAME}-set-scene`: (**Nanoleaf lights only**)

		```
			service: webhooks
			trigger: receive web request
			event name: {LIGHT_NAME}-set-scene-{SCENE_NAME}
			action service: nanoleaf
			action: set scene
				scene: {SCENE_NAME}
		```

1. Finally you'll need to get your secret key from IFTTT if you haven't done so before. Navigate to: https://ifttt.com/maker_webhooks and click the `Documentation` button. Then copy the key provided at the end of the example url.

1. Return to the database and navigate to your network. In the `variables` map property add the field: `IFTTT_KEY` with the value being key you just copied (string).

You're all set up!