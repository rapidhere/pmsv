/**
 * storage for user
 * @author rapidhere@gmail.com
 */
'use strict';

const fuckdb = require('./fuckdb');
const User = require('../models').User;

// module entry
(async function () {

// init store
let store = await fuckdb.load('user') || [];

// add a user
exports.addUser = async function addUser(user) {
  store.push(user.toStoreFormat());
  await fuckdb.store('user', store);
};

exports.findUserByName = function findUserByName(name) {
  for(let user of store) {
    if(user.username === name) {
      return new User(user.username, user.password, user.roomId, user.adminId, user.token);
    }
  }

  return null;
};

exports.findUserByToken = function findUserByToken(token) {
  for(let user of store) {
    if(user.token === token) {
      return user;
    }
  }

  return null;
};

})()

// for debug usage only
.catch((err) => console.log(err));