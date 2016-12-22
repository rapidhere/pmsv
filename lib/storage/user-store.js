/**
 * storage for user
 * @author rapidhere@gmail.com
 */
'use strict';

const fuckdb = require('./fuckdb');

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
      return user;
    }
  }

  return null;
};

})();