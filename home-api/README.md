# Home API

Performs actions on devices local to the API. This API should be hosted on the same wifi network as devices it wants to operate on.

## Setup
1. install dependencies
	```
	> npm install
	```

Follow steps described here https://developers.meethue.com/develop/get-started-2/

1. Open a web browser on the network you intend to run the Home API and navigate to: https://discovery.meethue.com/, this will list any Hue Bridges on your local network.

1. Test these details by opening your Hue's control panel at: https://{{BRIDGE_IP_ADDRESS}}/debug/clip.html

1. In this panel, create a user by sending the following request:
	```
	type: POST,
	url: '/api',
	body: { "devicetype": "my_home_api" }
	```
	Congratulations, you just created a user for your instance of the Home API to use to control your lights!

1. In orchestration-ui under Account / Settings ensure you're configured to use the Home API and enter the username and IP address.

1. expose your port to the internet, we recommend using [ngrok](https://ngrok.com/)
	```
	> ngrok http 4000
	```

5. enter your bridges details and internet url on the Account / Settings page in the orchestration-ui


## Running

1. start the program on the same port that ngrok is listening on
	```
	> npm run start
	```
