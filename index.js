const schedule = require('node-schedule');
const alarm = require('./alarm');
const lights = require('./config/lights');
const LightService = require('./lib/LightService');

const lightService = new LightService(lights);
alarm.activate(lightService);

// node-schedule patterns
const pattern = '44 12 * * *'; // every day at 07:30
// schedule.scheduleJob(pattern, alarm.activate);

