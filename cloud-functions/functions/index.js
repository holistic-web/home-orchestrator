const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getUser, getUsers, createUser, updateUserRole, deleteUser } = require('./modules/users/UsersFunctions');
const { getNetworks, updateNetwork } = require('./modules/networks/NetworksFunctions');

admin.initializeApp(functions.config().firebase);

exports.getUser = getUser;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUserRole = updateUserRole;
exports.deleteUser = deleteUser;

exports.getNetworks = getNetworks;
exports.updateNetwork = updateNetwork;