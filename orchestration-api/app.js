process.env.PORT = 3000;

const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./lib/config');
const routes = require('./routes');
const ErrorHandlerMiddleware = require('./middlewares/ErrorHandler');

admin.initializeApp({
	credential: admin.credential.cert(config.firebase.credential),
	databaseURL: config.firebase.databaseURL
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/lights', routes.LightsController);
app.use('/themes', routes.ThemesController);

app.use(ErrorHandlerMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Orchestration API listening on port ${process.env.PORT}!`),
);