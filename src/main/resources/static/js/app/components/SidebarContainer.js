define(['vue', 'text!templates/components/SidebarContainer.html'
    , 'app/components/sidebar/UserHandler'
    , 'app/components/sidebar/ChatList'
    , 'app/components/sidebar/ChatRoomUserList'
], function (Vue, template) {
    Vue.component('SidebarContainer', {
        template: template,
        props: {
            user: {
                type: Object,
                required: true
            }
        }
    })
});