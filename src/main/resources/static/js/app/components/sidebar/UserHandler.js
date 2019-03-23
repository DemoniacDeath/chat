define(['vue', 'text!templates/components/sidebar/UserHandler.html'], function (Vue, template) {
    Vue.component('UserHandler', {
        template: template,
        props: {
            user: {
                type: Object,
                required: true
            }
        }
    });
});