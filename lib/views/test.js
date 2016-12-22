/**
 * a test view
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;

exports.url = '/v1/test';

// use to test if server is running
exports.handler = class TestView extends Handler {
  constructor() {
    super();
  }

  get() {
    return {ok: "server is running"};
  }
}