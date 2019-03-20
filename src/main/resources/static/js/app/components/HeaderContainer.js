define(['vue', 'text!templates/components/HeaderContainer.html'], function (Vue, template) {
    Vue.component('HeaderContainer', {
        template: template,
        props: {
            title: {
                type: String,
                required: true
            }
        }
    });
});