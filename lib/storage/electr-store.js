/**
 * a electricity store
 * @author rapidhere@gmail.com
 */
'use strict';

const fuckdb = require('./fuckdb');

// module entry
(async function () {

// init store
let store = await fuckdb.load('electricity') || {};

exports.findElectricityUsageByRoomId = function(roomId) {
  return store[roomId] || null;
};

})()

// for debug usage only
.catch((err) => console.log(err));