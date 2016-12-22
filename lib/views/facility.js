/**
 * a facility view
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;

exports.url = '/v1/facility';
// a facility view
exports.handler = class FacilityView extends Handler {
  constructor() {
    super();
  }

  get(arg) {
    let user = this.loginUser(arg);

    return {utility_list: ["washer"]};
  }
};