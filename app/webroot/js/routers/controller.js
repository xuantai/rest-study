//controller
console.log('load controller');
define(function () {
    console.log('run controller');
    var TodoController = Marionette.Controller.extend({
        login: function () {
            //màn hình login
            this.nextView('views/login-layout-view', null, true);
        },
        todoLists: function () {
            //Routing tới view cho Todo layout
            this.nextView('views/todo-layout-view');
        },

        todoDetail: function (id) {
            this.nextView('views/todo-detail-layout-view', {modelId: id});
        },

        nextView: function (viewPath, option, tryShowLoginScreen) {
            if (window.application.isLoggedIn()) {
                //Đã đăng nhập
                if (tryShowLoginScreen) {
                    //Nếu bạn đã đăng nhập nhưng vẫn cố cắng chuyển đến trang login
                    //routed nó đến màn hình TODO list
                    Backbone.history.navigate('#todo-lists', {trigger: true, replace: true});
                    return;
                }
            } else {
                //Chưa đăng nhập
                if (!tryShowLoginScreen) {
                    //Nếu bạn vẫn cố vào khu vực cần phải login
                    //route nó đến trang login
                    Backbone.history.navigate('#login', {trigger: true, replace: true});
                    return;
                }
            }
            //Hiển thị header
            this.showHeaderRegion(tryShowLoginScreen);
            //Hiển thị nội dung
            require([viewPath], function (View) {
                window.application.mainRegion.show(new View(option));
            });
        },

        showHeaderRegion: function (tryShowLoginScreen) {
            if (tryShowLoginScreen) {
                //Ẩn header khi chuyển sang trang login
                window.application.headerRegion.empty();
            } else if (!window.application.headerRegion.hasView()) {
                //Nếu không chuyển thì hiện header
                require(['views/header-view'], function (View) {
                    window.application.headerRegion.show(new View({
                        model: window.application.loginUser
                    }));
                });
            }
        }


    });
    return TodoController;
});