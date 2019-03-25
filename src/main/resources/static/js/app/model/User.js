define(function() {
    var User = function User(id, handler) {
        this.id = id;
        this.handler = handler;
    };
    User.serialize = JSON.stringify;
    User.deserialize = function (data) {
        var deserializedData = JSON.parse(data);
        return new User(
            deserializedData['id'],
            deserializedData['handler']
        );
    };
    return User;
});