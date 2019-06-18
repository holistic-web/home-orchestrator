const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { updateLights } = require('./modules/lights/LightsFunctions');
const { createTheme, updateTheme, deleteTheme } = require('./modules/themes/ThemesFunctions');

admin.initializeApp(functions.config().firebase);

exports.updateLights = updateLights;

exports.createTheme = createTheme;
exports.updateTheme = updateTheme;
exports.deleteTheme = deleteTheme;