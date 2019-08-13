# Home API

Performs actions on devices local to the API. This API should be hosted on the same wifi network as devices it wants to operate on.

## Setup
1. install dependencies
	```
	> npm install
	```

2. ensure you have `service-account.json` present in the lib folder

3. connect to local bridge:
	- https://developers.meethue.com/develop/get-started-2/
	- docs in hue client library

## Running

1. start the program
	```
	> npm run start
	```

2 expose your url to the internet, we recommend using [ngrok](https://ngrok.com/)

3. enter this new url as your networks Local API Url in the Account / Settings page