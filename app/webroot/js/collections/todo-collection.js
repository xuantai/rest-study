var app = app || {};

//Collection của Todo list
(function(app) {
    app.TodoCollection = Backbone.Collection.extend({
        url : '/rest-study/todo_lists.json',
        model : app.TodoModel,

        parse : function(response) {
            //コレクションをパース
            console.log("Lấy Collection");
            return response;
        }
    });
})(app);