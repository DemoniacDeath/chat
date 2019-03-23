define(function () {
    var UsersRegistry = function UsersRegistry(users) {
        this.registry = {};
        if (typeof users === 'undefined' || users === null) {
            return this;
        }
        if (Array.isArray(users)) {
            for (var i in users) {
                if (users.hasOwnProperty(i)) {
                    this.registry[users[i].id] = users[i];
                }
            }
        } else if (users.constructor === Object) {
            this.registry = users;
        } else {
            throw Error("Something unexpected was provided as a registry of users");
        }
    };
    UsersRegistry.prototype.addUser = function addUser(user) {
        this.registry[user.id] = user;
    };
    UsersRegistry.prototype.getUser = function getUser(userId) {
        return this.registry[userId];
    };
    return UsersRegistry;
});