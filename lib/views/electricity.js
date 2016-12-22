/**
 * a electricity view
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;
const electStore = require('../storage/electr-store');

exports.url = '/v1/electricity';

// the user view
exports.handler = class ElectricityView extends Handler {
  constructor() {
    super();
  }

  get(arg) {
    let user = this.loginUser(arg);
    let remain =  electStore.findElectricityUsageByRoomId(user.roomId) || 0;

    return {remained_electricity_charge: remain};
  }
};