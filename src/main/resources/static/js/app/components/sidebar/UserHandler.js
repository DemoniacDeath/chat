define(['vue', 'text!templates/components/sidebar/UserHandler.html'], function (Vue, template) {
    Vue.component('UserHandler', {
        template: template,
        data: function () {
            return {
                handler: "DemoniacDeath"
            };
        }
    });
});