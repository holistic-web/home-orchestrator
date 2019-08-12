# Orchestration API

Performs actions on networks. This API is hosted in the cloud and provides simple services for performing actions on lights.

## Setup
1. install dependencies
	```
	> npm install
	```
2. ensure you have `service-account.json` present in the lib folder

## Running
```
> npm run start
```

## Deploying
This app is deployed on the Google cloud engine.

1. ensure you are set up with the google cloud cli by following the steps here:
https://cloud.google.com/sdk/docs/#install_the_latest_cloud_tools_version_cloudsdk_current_version

2. follow the instructions here to deploy the app:
https://cloud.google.com/community/tutorials/run-expressjs-on-google-app-engine