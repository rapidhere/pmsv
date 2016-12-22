/**
 * a mailbox store
 * @author rapidhere@gmail.com
 */
'use strict';

const fuckdb = require('./fuckdb');

// module entry
(async function () {

// init store
let store = await fuckdb.load('mailbox') || {};

exports.findStatusByRoomId = function(roomId) {
  return store['' + roomId] || true;
};

exports.updateMailboxStatus = async function(roomIds, isEmpty) {
  for(let roomId of roomIds) {
    store['' + roomId] = !! isEmpty;
  }
  await fuckdb.store('mailbox', store);
};

})()

// for debug usage only
.catch((err) => console.log(err));