define(function() {
    var User = function User(id, handler) {
        this.id = id;
        this.handler = handler;
    };
    return User;
});