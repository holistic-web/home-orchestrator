process.env.PORT = 3000;

const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./lib/service-account.json');
const routes = require('./routes');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://holistic-home-5134d.firebaseio.com'
});

const app = express();

app.use('/lights', routes.LightController)

app.listen(process.env.PORT, () =>
  console.log(`Orchestration API listening on port ${process.env.PORT}!`),
);