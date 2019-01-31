const schedule = require('node-schedule');
const alarm = require('./alarm');

// node-schedule patterns
const pattern = '30 7 * * *'; // every day at 07:30

schedule.scheduleJob(pattern, alarm.activate);
