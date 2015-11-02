//Header view
define(function(require){
    var bootbox = require('bootbox');
    var UserModel = require('models/user-model');

    var HeaderView = Marionette.ItemView.extend({

        //Tamplate
        template : '#header-template',

        ui : {
            logoutButton : '#logout',
        },

        //set các event hander cho DOM
        events : {
            //khi click log out button
            'click @ui.logoutButton' : 'onLogoutClick',
        },

        onLogoutClick : function(){
            var userModel = new UserModel();

            bootbox.confirm("are you sure you want to log out", function(confirmed){
                if (confirmed){
                    Backbone.history.navigate('#login', {trigger : true, replace : true});
                    userModel.logout(this.onLogoutSuccess);
                }
            })



        },

        onLogoutSuccess : function(message){
            window.application.clearLoginUser();
            console.log(message);
        },

    });
    return HeaderView;
});