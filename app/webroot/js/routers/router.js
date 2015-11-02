//router
console.log('load router');
define(function(require) {
    console.log('run router');
    var TodoController = require('routers/controller');
    var TodoRouter = Marionette.AppRouter.extend({
        //khởi tạo controller
        controller: new TodoController(),
        //Cấu hình routing
        appRoutes : {
            'login'             : 'login',
            ''                  : 'todoLists',
            'todo-lists'        : 'todoLists',
            'todo-lists/:id'    : 'todoDetail'
        },
    });
    return TodoRouter;
});