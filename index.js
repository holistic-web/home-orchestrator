const schedule = require('node-schedule');
const Alarm = require('./functions/Alarm');
const LightService = require('./lib/LightService');
const lights = require('./config/lights');

const lightService = new LightService(lights);

const alarm = new Alarm(lightService);

// schedule.scheduleJob('51 17 * * *', () => { alarm.activate(); });


alarm.activate();
