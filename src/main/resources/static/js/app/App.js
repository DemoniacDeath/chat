define(['vue', 'text!templates/App.html'
    , 'app/components/HeaderContainer'
    , 'app/components/InputContainer'
    , 'app/components/DialogContainer'
    , 'app/components/SidebarContainer'
], function (Vue, appTemplate) {
    return new Vue({
        el: '#app-root',
        template: appTemplate,
        data: {
            message: 'Hello World!!!'
        }
    });
});
