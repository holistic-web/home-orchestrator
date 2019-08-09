process.env.GOOGLE_APPLICATION_CREDENTIALS = '';
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

app.get('/', (req, res) => {

	lightService.updateLight(
		{
			_id: 'gViRNLbSdLGpvIlNaJ7K',
			state: {
				on: false
			}
		},
		'f99ph-pwoW8DYe8iqmt4pOtihqga4bJFMmgVccGhDah'
	);
	return res.send('ok');
});

app.listen(process.env.PORT, () =>
  console.log(`Orchestration API listening on port ${process.env.PORT}!`),
);