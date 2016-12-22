/**
 * some models
 * @author rapidhere@gmail.com
 */

// User model
class User {
  constructor(username, password, roomId, adminId, token) {
    this.username = username;
    this.password = password;
    this.token = token || null;
    this.roomId = roomId || null;
    this.adminId = adminId || null;
  }

  get isAdmin() {
    return !!this.adminId;
  }

  // generate a token for user
  assignToken() {
    this.token = `${this.username}-${new Date().toISOString()}-${Math.floor(Math.random() * 1000000)}`;
  }

  static fromStoreFormat(arg) {
    return new User(arg.username, arg.password, arg.room_id, arg.admin_id, arg.token);
  }

  toStoreFormat() {
    return {
      'username': this.username,
      'password': this.password,
      'admin_id': this.adminId,
      'room_id': this.roomId,
      'token': this.token};
  }
}

exports.User = User;