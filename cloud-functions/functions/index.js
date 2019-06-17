const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { updateLights } = require('./modules/lights/LightsFunctions');

admin.initializeApp(functions.config().firebase);

exports.updateLights = updateLights;