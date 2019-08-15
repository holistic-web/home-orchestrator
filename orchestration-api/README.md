# Orchestration API

Performs actions on networks. This API is hosted in the cloud and provides simple services for performing actions on lights.

It is hosted on: https://holistic-home-5134d.appspot.com

## Setup
1. install dependencies
	```
	> npm install
	```

2. Aquire service credentials and store the file as `/lib/service-account.json`
	_To acquire credentials, follow the steps outlined here: https://firebase.google.com/docs/admin/setup#initialize_the_sdk_

## Running
1. just run the app :)
	```
	> npm run start
	```

## Deploying
This app is deployed on the Google cloud engine.

1. ensure you are set up with the google cloud cli
	_https://cloud.google.com/sdk/docs/#install_the_latest_cloud_tools_version_cloudsdk_current_version_

2. Deploy the app with google cloud platform
	_https://cloud.google.com/community/tutorials/run-expressjs-on-google-app-engine_
	```
	> gcloud app deploy
	```