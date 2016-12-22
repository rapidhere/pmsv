/**
 * a billboard store
 * @author rapidhere@gmail.com
 */
'use strict';

const fuckdb = require('fuckdb');

// module entry
(async function () {

// init store
let store = await fuckdb.load('billboard') || "no content";

exports.getBillBoard = function() {
  return store;
};

exports.updateBillBoard = function(newContent) {
  store = newContent;
  fuckdb.store('billboard', store);
}

})()

// for debug usage only
.catch((err) => console.log(err));