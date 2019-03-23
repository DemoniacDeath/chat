define(['vue', 'text!templates/components/DialogContainer.html'
    , 'moment'
    , 'app/EventBus'
    , 'app/model/DialogMessage'
    , 'app/model/UsersRegistry'
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
                messages: [],
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