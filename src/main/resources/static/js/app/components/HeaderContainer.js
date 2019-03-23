define(['vue'
    , 'text!templates/components/HeaderContainer.html'
    , 'css!styles/components/HeaderContainer.css'
], function (Vue, template) {
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