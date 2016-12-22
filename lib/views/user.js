/**
 * the user view
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;
const userStore = require('../storage/user-store');

const User = require('../models').User;

exports.url = '/v1/user';

// the user view
exports.handler = class UserView extends Handler {
  constructor() {
    super();
  }

  //~ view routers
  // user login
  get(arg) {
    if(! arg.username) {
      return this.badRequest('username cannot be null');
    }

    if(! arg.password) {
      return this.badRequest('password cannot be null');
    }

    let user = userStore.findUserByName(arg.username);
    if(user === null) {
      return this.notFound('no such user ' + arg.username);
    }

    if(user.password !== arg.password) {
      return this.forbidden('wrong password');
    }

    return this.responseUser(user);
  }

  // register user
  async put(arg) {
    if(! arg.username) {
      return this.badRequest('username cannot be null');
    }

    if(! arg.password) {
      return this.badRequest('password cannot be null');
    }

    if(! arg.admin_id && ! arg.room_id) {
      return this.badRequest('must have adminid or roomid');
    }

    let user = User.fromStoreFormat(arg);
    // assign user a new token
    user.assignToken()

    await userStore.addUser(user);

    return this.responseUser(user);
  }

  // format user to return
  responseUser(user) {
    return {
      username: user.username,
      room_id: user.roomId,
      is_admin: user.isAdmin,
      user_token: user.token
    };
  }
}