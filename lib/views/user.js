/**
 * the user view
 * @author rapidhere@gmail.com
 */
'use strict';

const Handler = require('../route').Handler;
const userStore = require('../storage/user-store');

const User = require('../models').User;

module.exports = class UserView extends Handler {
  constructor() {
    super('/v1/user');
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

    let user = new User.fromStoreFormat(arg);

    await userStore.addUser(user);

    return this.responseUser(user);
  }

  // format user to return
  responseUser(user) {
    return {
      username: user.username,
      room_id: user.roomId,
      is_admin: user.isAdmin,
      user_token: '' // TODO;
    };
  }
}