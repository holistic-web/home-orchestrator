const functions = require('firebase-functions');
const admin = require('firebase-admin');
require('cors')({ origin: true });
const { getLights, updateLights } = require('./modules/lights/LightsFunctions');
const { getTheme, getThemes, createTheme, updateTheme, deleteTheme } = require('./modules/themes/ThemesFunctions');

admin.initializeApp(functions.config().firebase);

exports.getLights = getLights;
exports.updateLights = updateLights;

exports.getTheme = getTheme;
exports.getThemes = getThemes;
exports.createTheme = createTheme;
exports.updateTheme = updateTheme;
exports.deleteTheme = deleteTheme;

