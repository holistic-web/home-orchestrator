# Home API

Performs actions on devices local to the API. This API should be hosted on the same wifi network as devices it wants to operate on.

## Setup
1. install dependencies
	```
	> npm install
	```

2. ensure you have `service-account.json` present in the lib folder

3. get the details for your local bridge to local bridge:
	- https://developers.meethue.com/develop/get-started-2/
	- docs in hue client library

4 expose your port to the internet, we recommend using [ngrok](https://ngrok.com/)
	```
	> ngrok http 4000
	```

5. enter your bridges details and internet url on the Account / Settings page in the orchestration-ui


## Running

1. start the program on the same port that ngrok is listening on
	```
	> npm run start
	```
