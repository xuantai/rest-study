//layout cho view của trang login
define(function(require) {
    var LoginModel = require('models/user-model');

    var LoginLayoutView = Marionette.LayoutView.extend({
        //テンプレート
        template : '#login-layout-template',

        //UIパーツ
        ui : {
            username         : '#username',
            password         : '#password',
            loginButton      : '#login',
            signupUsername   : '#signup-username',
            signupPassword   : '#signup-password',
            signupRePassword : '#signup-re-password',
            name             : '#signup-name',
            signupButton     : '#signup'


        },

        //event
        events : {
            //Khi click button login
            'click @ui.loginButton' : 'onLoginClick',
            //Khi click button Sign up
            'click @ui.signupButton' : 'onsignupClick',
            'keypress @ui.username': 'onKeyPressLogin',
            'keypress @ui.password': 'onKeyPressLogin',
            'keypress @ui.signupUsername': 'onKeyPressSignup',
            'keypress @ui.signupPassword': 'onKeyPressSignup',
            'keypress @ui.signupRePassword': 'onKeyPressSignup',
            'keypress @ui.name': 'onKeyPressSignup',
            'change @ui.username': 'usernameChanged',
            'change @ui.password': 'passwordChanged',
            'change @ui.signupUsername': 'sUsernameChanged',
            'change @ui.signupPassword': 'sPasswordChanged'



        },

        usernameChanged: function(e) {
            var username = this.ui.username.val();    //username
            var password = this.ui.password.val();
            var signupUsername = this.ui.signupUsername.val();    //username
            var signupPassword = this.ui.signupPassword.val();

            document.getElementById("signup-username").innerHTML = username;

        },

        //xử lý sự kiện click button login
        onLoginClick : function(){
            //Lấy giá trị trong textbox
            var username = this.ui.username.val();    //username
            var password = this.ui.password.val();    //password
            window.application.loginUser.login(
                username,
                password,
                this.onLoginSuccess,
                this.onLoginError);
        },

        onKeyPressLogin : function(event){
            console.log("press enter");
            if (event.keyCode == 13) { //press Enter
               this.onLoginClick();
            }

        },
        onKeyPressSignup : function(event){
            console.log("press enter");
            if (event.keyCode == 13) { //press Enter
                this.onsignupClick();
            }

        },

        //Callback khi đăng nhập thành công
        onLoginSuccess : function(message){
            Backbone.history.navigate('todo-lists', {trigger: true, replace: true});
            console.log(message);

        },

        //callback khi đăng nhập thất bại
        onLoginError : function(){
            document.getElementById("notice").innerHTML = "<div class='alert alert-danger'>Can not connect</div>";

        },



        //Xử lý event click button sign up
        onsignupClick : function(){
            //Lấy giá trị từ checkbox
            var username = this.ui.signupUsername.val();    //username
            var password = this.ui.signupPassword.val();    //password
            var rePassword = this.ui.signupRePassword.val();
            var name = this.ui.name.val();    //tên
            if (password !== rePassword) {
                 document.getElementById("notice").innerHTML = "<div class='alert alert-warning'>Your re-enter password is not match</div>";
            } else {
                var userModel = new LoginModel();
                userModel.signup(
                    username,
                    password,
                    name,
                    this.onsignupSuccess,
                    this.onsignupError);
            }


        },

        //Callback khi đăng ký thành công
        onsignupSuccess : function(message){
            document.getElementById("notice").innerHTML = "<div class='alert alert-success'>"+message+"</div>";

        },

        //callback khi đăng ký thất bại
        onsignupError : function(message){
            document.getElementById("notice").innerHTML = "<div class='alert alert-danger'>The name already exist, please choose another</div>";

        },

    });
    return LoginLayoutView;
});