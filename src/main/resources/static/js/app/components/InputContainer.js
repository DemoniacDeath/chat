define(['vue', 'text!templates/components/InputContainer.html'
    , 'app/EventBus'
    , 'app/model/DialogMessage'
    , 'css!styles/components/InputContainer.css'
], function (Vue, template, EventBus, DialogMessage) {
    Vue.component('InputContainer', {
        template: template,
        props: {
            currentUserId: {
                type: String,
                required: true
            }
        },
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
                var message = new DialogMessage(this.message, this.currentUserId);
                this.message = null;
                EventBus.$emit('message-was-sent', message);
            }
        }
    });
});