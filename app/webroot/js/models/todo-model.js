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


        },
        validate: function (attrs) {
            var errors = [];

            //Kiểm tra độ dài
            var todoLength = attrs.todo.length;
            if (todoLength < 1 || todoLength > 200) {
                errors.push('[Client]The TODO length must be 1〜200 characters');
            }

            //Thử nghiệm
            //if (attrs.todo !== 'hoge') {
            //    errors.push('[Client]TODO only "hoge" !');
            //}



            if (errors.length > 0) {
                return errors;
            } else {
                return null;
            }
        }
    });
    return TodoModel;
});