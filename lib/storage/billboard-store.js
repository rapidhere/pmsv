/**
 * a billboard store
 * @author rapidhere@gmail.com
 */
'use strict';

const fuckdb = require('./fuckdb');

// module entry
(async function () {

// init store
let store = await fuckdb.load('billboard') || "no content";

exports.getBillBoard = function() {
  return store;
};

exports.updateBillBoard = async function(newContent) {
  store = newContent;
  await fuckdb.store('billboard', store);
}

})()

// for debug usage only
.catch((err) => console.log(err));