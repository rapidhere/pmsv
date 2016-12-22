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

  for(let i = 1; i <= 14; i ++) {
    for(let j = 0; j < 24; j ++) {
      let slotIdx = i * 100 + j;
      if(!!store['' + slotIdx]) {
        ret.push(slotIdx);
      }
    }
  }
  return ret;
};

exports.useSlot = async function(slotIndex) {
  store['' + slotIndex] = true;
  await fuckdb.store('timeslot', store);
};

async function initSlots() {
  let now = new Date();
  let ret = {};

  for(let i = 1; i <= now.getDay();i ++) {
    for(let j = 0; j <= (i === now.getDay() ? now.getHours() : 23); j ++) {
      let slotIdx = (i * 100 + j);
      ret['' + slotIdx] = true;
    }
  }
  
  for(let i = now.getDay(); i <= 7; i ++) {
    for(let j = (i === now.getDay() ? now.getHours() + 1 : 0); j < 24; j ++) {
      let slotIdx = (i * 100 + j);
      if(store[slotIdx] === true) {
        ret['' + slotIdx] = true;
      } else {
        ret['' + slotIdx] = false;
      }
    }
  }
  
  for(let i = 1; i <= now.getDay(); i ++) {
    for(let j = 0; j <= (i === now.getDay() ? now.getHours() : 23) ; j ++) {
      let slotIdx = (i + 7) * 100 + j;
      if(store[slotIdx] === true) {
        ret['' + slotIdx] = true;
      } else {
        ret['' + slotIdx] = false;
      }
    }
  }

  await fuckdb.store('timeslot', ret);
  return ret;
}

})()

// for debug usage only
.catch((err) => console.log(err));