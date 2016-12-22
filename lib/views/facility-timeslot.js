/**
 * a facility time-slot
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;
const timeSlotStore = require('../storage/timeslot-store');

exports.url = '/v1/facility_timeslot'
// a facility time slot view
exports.handler = class FacilityTimeSlotView extends Handler {
  constructor() {
    super();
  }

  async get(arg) {
    let user = this.loginUser(arg);
    return {bookTime_list: await timeSlotStore.getAvailableSlot()}
  }

  async put(arg) {
    let user = this.loginUser(arg);
    await timeSlotStore.useSlot(parseInt(arg.slot_index) || 0);
    return {};
  }
};