const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getUser, getUsers, createUser, updateUserRole, deleteUser } = require('./modules/users/UsersFunctions');
const { getNetworks } = require('./modules/networks/NetworksFunctions');
const { getLights, updateLights } = require('./modules/lights/LightsFunctions');
const { getTheme, getThemes, createTheme, updateTheme, deleteTheme } = require('./modules/themes/ThemesFunctions');

admin.initializeApp(functions.config().firebase);

exports.getUser = getUser;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUserRole = updateUserRole;
exports.deleteUser = deleteUser;

exports.getNetworks = getNetworks;

exports.getLights = getLights;
exports.updateLights = updateLights;

exports.getTheme = getTheme;
exports.getThemes = getThemes;
exports.createTheme = createTheme;
exports.updateTheme = updateTheme;
exports.deleteTheme = deleteTheme;