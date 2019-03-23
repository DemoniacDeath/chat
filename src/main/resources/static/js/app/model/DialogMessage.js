define(function () {
    var DialogMessage = function Message(body, fromUserId, timestamp) {
        this.body = body;
        this.fromUserId = fromUserId;
        this.timestamp = timestamp || Date.now();
    };
    return DialogMessage;
});