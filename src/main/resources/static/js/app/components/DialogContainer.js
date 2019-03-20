define(['vue', 'text!templates/components/DialogContainer.html'
    , 'app/EventBus'
    , 'moment'
], function (Vue, template, EventBus, moment) {
    Vue.component('DialogContainer', {
        template: template,
        data: function () {
            return {
                messages: [
                    {
                        isIncoming: false,
                        from: "You",
                        timestamp: parseFloat(moment().subtract(2, 'hour').format('x')),
                        body: "Hello World"
                    },
                    {
                        isIncoming: true,
                        from: "Some Dude",
                        timestamp: parseFloat(moment().subtract(1, 'second').format('x')),
                        body: "Hello You"
                    }
                ],
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
            EventBus.$on('message-was-sent', function (message) {
                this.messages.push(message);
            }.bind(this));
            this.interval = setInterval(function () {this.$forceUpdate()}.bind(this), 1000);
        }
    });
});