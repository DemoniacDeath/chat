define(['app/EventBus'
    , 'sockjs-client'
    , 'app/model/DialogMessage'
    , 'app/model/User'
    , 'stomp-websocket'
], function (EventBus, SockJS, DialogMessage, User) {
    var socket = new SockJS("/socket");
    var stomp = Stomp.over(socket);
    stomp.connect({}, function () {
        EventBus.$on('message-was-sent', function (message) {
            stomp.send('/app/message-was-sent', {}, DialogMessage.serialize(message));
        });
        EventBus.$on('user-sending-requested', function (user) {
            stomp.send('/app/send-user', {}, User.serialize(user));
        });
        EventBus.$on('ping-requested', function() {
            stomp.send('/app/ping');
        });
        EventBus.$on('joined-chat', function(user) {
            stomp.send('/app/user-joined', {}, User.serialize(user));
        });
        EventBus.$on('user-initialized', function (user) {
            EventBus.$emit('user-sending-requested', user);
            EventBus.$emit('joined-chat', user);
            EventBus.$on('pong', function() {
                EventBus.$emit('user-sending-requested', user);
            });
            EventBus.$emit('ping-requested');
        });

        stomp.subscribe('/topic/ping', function() {
            EventBus.$emit('pong');
        });
        stomp.subscribe('/topic/chat', function (data) {
            EventBus.$emit('new-message', DialogMessage.deserialize(data.body));
        });
        stomp.subscribe('/topic/user', function (data) {
            EventBus.$emit('update-users', User.deserialize(data.body));
        });

        EventBus.$emit('socket-connected');
    });
});
