define(function () {
    var TodoModel = Backbone.Model.extend({
        urlRoot: '/rest-study/todo_lists',
        parse: function (response) {
            //モデルをパース
            console.log("parse model");
            console.log(response);

            var parsed = response.TodoList;
            if (response.Owner) {
                parsed.Owner = response.Owner;
                parsed.Assignee = response.Assignee;
            }
            return parsed;
        },
        toggle: function () {
            this.set('status', this.get("status") === '1' ? '0' : '1');
            this.save();
        }
    });
    return TodoModel;
});