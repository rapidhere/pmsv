/**
 * a test view
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;

// use to test if server is running
module.exports = class TestView extends Handler {
  constructor() {
    super('/v1/test');
  }

  get() {
    return {ok: "server is running"};
  }
}