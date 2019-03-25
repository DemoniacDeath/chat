define(function () {
    var DialogMessage = function Message(body, fromUserId, timestamp) {
        this.body = body;
        this.fromUserId = fromUserId;
        this.timestamp = timestamp || Date.now();
    };

    DialogMessage.serialize = JSON.stringify;
    DialogMessage.deserialize = function (data) {
        var deserializedData = JSON.parse(data);
        return new DialogMessage(
            deserializedData['body'],
            deserializedData['fromUserId'],
            deserializedData['timestamp']
        );
    };
    return DialogMessage;
});