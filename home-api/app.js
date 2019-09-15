const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./lib/config');
const LightService = require('./lib/LightService');
const ErrorHandlerMiddleware = require('./middlewares/ErrorHandler');

const app = express();
const lightService = new LightService();

app.use(cors());
app.use(bodyParser.json());

app.post('/updateLight', async (req, res, next) => {
	try {

		console.log('> /updateLight ~ called with: ' + JSON.stringify(req.body, null, 4));
		const { light, network } = req.body;

		// Update the light
		console.log('> updateLight~ updating the light\'s state');
		await lightService.updateLight(light, network);

		return res.send('done');

	} catch (err) {
		next(err);
	}
});

app.use(ErrorHandlerMiddleware);

app.listen(config.port, () =>
	console.log(`Home API listening on port ${config.port}!`),
);