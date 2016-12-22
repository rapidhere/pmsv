/**
 * a electricity view
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;
const billBoardStore = require('../storage/billboard-store');

exports.url = '/v1/billboard';

// the user view
exports.handler = class BillBoardView extends Handler {
  constructor() {
    super();
  }

  get(arg) {
    let user = this.loginUser(arg);
    let content = billBoardStore.getBillBoard();

    return {content: content};
  }

  put(arg) {
    let user = this.loginAdmin(arg);
  }
};