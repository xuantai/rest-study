//Application
console.log('load app');
define(function (require) {
    var bootbox = require('bootbox');
    console.log('run app');
    var Router = require('routers/router');
    var UserModel = require('models/user-model');
    var Application = Marionette.Application.extend({
        initialize: function () {
            console.log('app.initialize');
            // Set a common handler of error of Ajax
            $(document).ajaxError(function (e, xhr, options, message) {
                window.application.ajaxErrorHandler(e, xhr, options, message);
            });
            new Router();
            //Lấy thông tin login từ server
            this.loginUser = new UserModel();
            this.getLoginUser();

        },

        onStart: function () {
            Backbone.history.start();
        },

        regions: {
            headerRegion: '#header',
            mainRegion: '#main'
        },
//thông tin user cần lưu trữ
        loginUser: null,

        //bắt đầu lấy thông tin đăng nhập
        getLoginUser: function () {
            this.loginUser.getLoginUser(
                this.onLoggedIn,
                this.onNotLoggedIn
            );
        },

        //Lấy thông tin user: trường hợp đã login
        onLoggedIn: function () {
            window.application.start(); // applicaiton.start() sau khi check login
        },

        //Lấy thông tin user: trường hợp chưa login
        onNotLoggedIn: function () {
            window.application.clearLoginUser();    // mình sẽ bỏ qua thông tin login của user
            window.application.start(); // applicaiton.start() sau khi check login
        },

        //Các phần xử lý
        isLoggedIn: function () {
            return this.loginUser.isLoggedIn();
        },

        //Xóa thông tin login của user khi logout
        clearLoginUser: function () {
            this.loginUser.clear();
        },

        // Các hàm bắt lỗi của ajax
        ajaxErrorHandler: function (e, xhr, options, message) {
            if (xhr.status === 401) {
                this.clearLoginUser();
                // Nếu unauthenticated thì chuyển về màn hình login
                Backbone.history.navigate('#login', {trigger: true, replace: true});
            } else if (xhr.status === 400) {
                if (xhr.responseJSON) {
                    var errors = xhr.responseJSON.errors;
                    var msg = '';
                    for (var key in errors) {
                        for (var idx in errors[key]) {
                            msg = msg + errors[key][idx] + '\n';
                         }
                    }
                    bootbox.alert(msg);
                } else {
                    bootbox.alert(message);
                }
            } else if (xhr.status > 400 && xhr.status < 500) {
                //Hiển thị các lỗi ClientError
                bootbox.alert(message);
            } else if (xhr.status >= 500 && xhr.status < 600) {
                //Hiển thị các lỗi ServerError
                bootbox.alert(message);
            }
        },

    });
    return Application;
});