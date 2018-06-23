var colors = [
    '#FF0000', '#FF4500', '#228B22', '#0000FF', '#FFD700', '#8B4513'
];

var colorCounter = 0;

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        if(colorCounter > 4) {
            colorCounter = 0;
        }

        var user = {id, name, room, color: colors[colorCounter]};
        colorCounter++;

        this.users.push(user);
        return user;
  }

  removeUser (id) {
      var user = this.getUser(id);

      if (user) {
          this.users = this.users.filter((user) => user.id !== id);
      }

      return user;
  }

  getUser (id) {
      return this.users.filter((user) => user.id === id)[0]
  }

  getUserList (room) {
      var users = this.users.filter((user) => user.room === room);
      var namesArray = users.map((user) => user.name);

      return namesArray;
  }
}

module.exports = {Users};
