/**
 * a mailbox view
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;
const mailboxStore = require('../storage/mailbox-store');

exports.url = '/v1/mailbox';

// the user view
exports.handler = class MailboxView extends Handler {
  constructor() {
    super();
  }

  get(arg) {
    let user = this.loginUser(arg);

    let roomId = arg.room_id;
    if(! roomId) {
      this.badRequest('room_id is null');
    }

    // TODO
    return {is_empty: mailboxStore.findStatusByRoomId(roomId)};
  }

  async put(arg) {
    let user = this.loginAdmin(arg);
    let roomIds = arg.room_ids || [];
    await mailboxStore.updateMailboxStatus(roomIds, arg.is_empty || true);
    return {};
  }
};