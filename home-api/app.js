const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { promisify } = require('util');
const config = require('./lib/config');
const LightService = require('./lib/LightService');
const ErrorHandlerMiddleware = require('./middlewares/ErrorHandler');

const sleep = promisify(setTimeout);

const app = express();
const lightService = new LightService();

app.use(cors());
app.use(bodyParser.json());

app.post('/updateLight', async (req, res, next) => {
	try {

		// console.log(`> /updateLight ~ called with: ${JSON.stringify(req.body, null, 4)}`);
		const { light, network } = req.body;

		// Update the light
		console.log('> updateLight~ updating the light\'s state');
		await lightService.updateLight(light, network);

		return res.send('done');

	} catch (err) {
		return next(err);
	}
});

app.post('/alert', async (req, res, next) => {
	try {
		const { light, network } = req.body;
		for (let i = 0; i < 30; i++) {
			// const a = 255 * (i / 30);
			// const b = 255 * (1 - (i / 30));
			light.state.colour = 'rgb(255,0,0)';
			// light.state.on = true;
			await lightService.updateLight(light, network);
			await sleep(500);
			light.state.colour = 'rgb(0,0,255)';
			// light.state.on = false;
			await lightService.updateLight(light, network);
			await sleep(500);
		}
		return res.send('done');

	} catch (err) {
		return next(err);
	}
});

app.use(ErrorHandlerMiddleware);

app.listen(config.port, () => console.log(`Home API listening on port ${config.port}!`),);
