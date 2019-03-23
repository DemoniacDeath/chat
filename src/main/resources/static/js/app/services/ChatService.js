define(['app/EventBus'
    , 'app/model/DialogMessage'
], function (EventBus, DialogMessage) {
    var ws = new WebSocket("ws://localhost:8080/ws");
    ws.onopen = function (ev) {
        console.log(ev);
        EventBus.$on('message-was-sent', function(message) {
            ws.send(message.fromUserId);
        });
    };
    ws.onmessage = function (ev) {
        EventBus.$emit('new-message', new DialogMessage(ev.data, ev.data));
    }
});