define(['vue', 'text!templates/components/InputContainer.html'
    , 'app/EventBus'
], function (Vue, template, EventBus) {
    Vue.component('InputContainer', {
        template: template,
        data: function () {
            return {
                message: null
            };
        },
        methods: {
            enterPressed: function (event) {
                //add logic for switching ctrl+enter behaviour
                var shouldNewLine = !event.ctrlKey;
                if (!shouldNewLine) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.sendMessage();
                }
            },
            sendMessage: function () {
                if (!this.message) {
                    return;
                }
                if (!this.message.trim()) {
                    this.message = null;
                    return;
                }
                var message = {
                    body: this.message,
                    timestamp: new Date().getTime(),
                    isIncoming: false,
                    from: "You"
                };
                this.message = null;
                EventBus.$emit('message-was-sent', message);
            }
        }
    });
});