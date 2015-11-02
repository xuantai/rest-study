//login model
define(function() {
    var LoginModel = Backbone.Model.extend({

        parse : function(response) {
            if(response.message){
                this.loginMessage = response.message;
            }
            return response.User;
        },

        loginMessage : null,

        //Xác định đã đăng nhập chưa
        isLoggedIn : function(){
            return this.get('id') ? true : false;
        },

        //Lấy thông tin user khi đã login
        getLoginUser : function(onLoggedIn, onNotLoggedIn){
            this.urlRoot = '/rest-study/users/loggedin';
            this.fetch(
                {
                    wait : true,
                    success : function(){
                        onLoggedIn();
                    },
                    error : function(){
                        onNotLoggedIn();
                    },
                }
            );
        },

        //Login
        login : function(username, password, onLoginSuccess, onLoginError){
            this.urlRoot = '/rest-study/users/login';
            this.save(
                {
                    username : username,
                    password : password
                }, {
                    success : function(model){
                        if(model.get('id')){
                            onLoginSuccess(model.loginMessage);
                        }else{
                            onLoginError(model.loginMessage);
                        }
                    },
                }
            );
        },

        //Đăng xuất
        logout : function(onLogoutSuccess){
            this.urlRoot = '/rest-study/users/logout';
            this.save(
                {},
                {
                    success : function(model){
                        onLogoutSuccess(model.loginMessage);
                    },
                }
            );
        },

        //Đăng ký ( sign up )
        signup : function(username, password,  name, onSignUpSuccess, onSignUpError){
            this.urlRoot = '/rest-study/users/signup';
            this.save(
                {
                    username : username,
                    password : password,
                    name     : name
                }, {
                    success : function(model){
                        if(model.get('id')){
                            onSignUpSuccess(model.loginMessage);
                        }else{
                            onSignUpError(model.loginMessage);
                        }
                    },
                }
            );
        },
    });
    return LoginModel;
});