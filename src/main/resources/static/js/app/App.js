define(['vue', 'text!templates/App.html'
    , 'http://wzrd.in/standalone/uuid%2Fv4@latest'
    , 'app/model/User'
    , 'app/model/UsersRegistry'
    , 'app/components/HeaderContainer'
    , 'app/components/InputContainer'
    , 'app/components/DialogContainer'
    , 'app/components/SidebarContainer'
    , 'app/services/ChatService'
], function (Vue, appTemplate, uuid, User, UsersRegistry) {
    var user = new User(uuid(), "DemoniacDeath");
    var usersRegistry = new UsersRegistry();
    usersRegistry.addUser(user);
    return new Vue({
        el: '#app-root',
        template: appTemplate,
        data: {
            currentUserId: user.id,
            usersRegistry: usersRegistry
        },
        computed: {
            user: function() {
                return this.usersRegistry.getUser(this.currentUserId);
            }
        }
    });
});
