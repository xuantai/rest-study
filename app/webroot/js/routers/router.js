var app = app || {};

//router
(function(app) {
    app.TodoRouter = Backbone.Router.extend({
        routes : {
            ''                  : 'todoLists',
            'todo-lists'        : 'todoLists',
            'todo-lists/:id'    : 'todoDetail'
        },
        todoLists : function() {
            alert('TODOˆêlist');
        },
        todoDetail : function(id) {
            alert('id = ' + id + ' ‚ÌChi ti?t hi?n th? TODO');
        },
    });
})(app);