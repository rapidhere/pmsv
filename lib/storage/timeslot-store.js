/**
 * timeslot storage
 * @author rapidhere@gmail.com
 */
'use strict';

const fuckdb = require('./fuckdb');

// module entry
(async function () {

// init store
let store = await fuckdb.load('timeslot') || {};

exports.getAvailableSlot = async function() {
  let ret = [];
  store = await initSlots();

  for(let i = 0;i < 7;i ++) {
    for(let j = 0;j < 24;j ++) {
      let slotIdx = i * 24 + j;
      if(store['' + slotIdx]) {
        ret.push(slotIdx);
      }
    }
  }

  return ret;
};

exports.useSlot = async function(slotIndex) {
  store['' + slotIndex] = false;
  await fuckdb.store('timeslot', store);
};

async function initSlots() {
  let now = new Date();
  let ret = {};

  for(let i = now.getDay(); i <= 7;i ++) {
    for(let j = (i === now.getDay() ? now.getHours() + 1 : 1);j <= 24;j ++) {
      let slotIdx = ((i - 1) * 24 + j - 1);
      if(store[slotIdx] === false) {
        ret['' + slotIdx] = false;
      } else {
        ret['' + slotIdx] = true;
      }
    }
  }

  await fuckdb.store('timeslot', ret);
  return ret;
}

})()

// for debug usage only
.catch((err) => console.log(err));