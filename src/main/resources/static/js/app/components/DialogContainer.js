define(['vue', 'text!templates/components/DialogContainer.html'
    , 'moment'
    , 'app/EventBus'
    , 'app/model/DialogMessage'
    , 'app/model/UsersRegistry'
    , 'css!styles/components/DialogContainer.css'
], function (Vue, template, moment, EventBus, DialogMessage, UsersRegistry) {
    Vue.component('DialogContainer', {
        template: template,
        props: {
            currentUserId: {
                type: String,
                required: true
            },
            usersRegistry: {
                type: UsersRegistry,
                required: true
            }
        },
        data: function () {
            return {
                messages: [new DialogMessage("Your handler is 'Guest'. Type '/handler [new handler]' to change your handler to 'new handler'", "")],
                interval: null
            };
        },
        filters: {
            fromNow: function (date) {
                return moment(date).fromNow();
            }
        },
        beforeDestroy: function () {
            clearInterval(this.interval);
        },
        mounted: function () {
            EventBus.$on('new-message', function (message) {
                this.messages.push(message);
            }.bind(this));
            this.interval = setInterval(function () {this.$forceUpdate()}.bind(this), 1000);
        }
    });
});