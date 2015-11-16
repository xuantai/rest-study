define(function (require) {
    var TodoModel = require('models/todo-model');
    var userID = window.application.loginUser.get('id');
    var TodoCollection = Backbone.Collection.extend({
            url: '/rest-study/todo_lists.json',
            model: TodoModel,


            parse: function (response) {
                //コレクションをパース
                console.log("コレクションをパース");
                return response;
            },

            resetAll: function () {


                var eachProcess = function (model) {

                    var owner = model.get('Owner').id;
                    var assignee = model.get('Assignee').id;

                    if (owner == userID || assignee == userID) {
                        model.set('status', '0');
                        model.save();
                    }

                };
                this.each(eachProcess);
            },

            deleteAll: function () {

                var eachProcess = function (model) {

                    var owner = model.get('Owner').id;
                    

                    if (owner == userID) {
                        model.destroy({
                            wait: true
                        })
                    }
                }
                this.each(eachProcess);

            },


            hideDone: function () {
                this.originalModels = this.models;
                var unDone = this.where({'status': '0'});
                this.hided = true;
                this.reset(unDone);
            },

            showFull: function () {
                this.hided = false;
                this.reset(this.originalModels);
            }


        }
    );
    return TodoCollection;
});

