/**
 * a electricity view
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;
const electStore = require('../storage/electr-store');

exports.url = '/v1/electricity';

// the electricity view
exports.handler = class ElectricityView extends Handler {
  constructor() {
    super();
  }

  get(arg) {
    let user = this.loginUser(arg);
    let roomId;

    if(! arg.roomId) {
      roomId = arg.roomId;
    } else {
      roomId = user.roomId;
    }

    let remain =  electStore.findElectricityUsageByRoomId(roomId) || 0;

    return {remained_electricity_charge: remain};
  }
};