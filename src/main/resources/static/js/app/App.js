define(['vue', 'text!templates/App.html'
    , 'app/EventBus'
    , 'node-uuid'
    , 'app/model/User'
    , 'app/model/UsersRegistry'
    , 'app/components/HeaderContainer'
    , 'app/components/InputContainer'
    , 'app/components/DialogContainer'
    , 'app/components/SidebarContainer'
    , 'app/services/ChatService'
    , 'css!styles/main.css'
    , 'css!styles/App.css'
], function (Vue, appTemplate, EventBus, uuid, User, UsersRegistry) {
    var user = new User(uuid.v4(), "Guest");
    var usersRegistry = new UsersRegistry();

    var systemUser = new User("", "System Info");
    usersRegistry.addUser(user);
    usersRegistry.addUser(systemUser);
    EventBus.$on('socket-connected', function() {
        EventBus.$emit('user-initialized', user);
    });
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
        },
        mounted: function() {
            EventBus.$on('update-users', function (user) {
                this.usersRegistry.addUser(user);
            }.bind(this));
        }
    });
});
