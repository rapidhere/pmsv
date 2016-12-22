/**
 * some models
 * @author rapidhere@gmail.com
 */

// User model
class User {
  contructor(username, password, roomId, adminId) {
    this.username = username;
    this.password = password;
    this.roomId = roomId || null;
    this.adminId = adminId || null;
  }

  get isAdmin() {
    return !!this.adminId;
  }

  static fromStoreFormat(arg) {
    return new User(arg.username, arg.password, arg.room_id, arg.admin_id);
  }

  toStoreFormat() {
    return {
      'username': this.username,
      'password': this.password,
      'admin_id': this.adminId,
      'room_id': this.roomId};
  }
}

exports.User = User;