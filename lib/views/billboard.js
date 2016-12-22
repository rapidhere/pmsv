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

  async put(arg) {
    let user = this.loginAdmin(arg);
    if(! arg.content) {
      this.badRequest('no content');
    }

    await billBoardStore.updateBillBoard(arg.content);
    return {};
  }
};