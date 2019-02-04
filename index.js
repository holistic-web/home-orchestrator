const schedule = require('node-schedule');
const Alarm = require('./modules/Alarm');
const LightService = require('./lib/LightService');

const lightService = new LightService();

// const alarm = new Alarm(lightService);
// schedule.scheduleJob('30 7 * * *', () => { alarm.activate(); });

lightService.setTheme('default');
