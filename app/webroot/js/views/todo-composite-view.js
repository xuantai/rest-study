define(function (require) {
    var bootbox = require('bootbox');
    var TodoItemView = require('views/todo-item-view');
    var TodoModel = require('models/todo-model');
    var TodoCompositeView = Backbone.Marionette.CompositeView.extend({
        template: '#todo-composite-template',

        childView: TodoItemView,

        childViewContainer: 'tbody',
        newTodoModel : new TodoModel(),

        ui: {
            addTodo: '#addTodo',
            newTodo: '#new-todo',
            resetAllTodo: '#resetAllTodo',
            deleteAllTodo: '#deleteAllTodo',
            hideShowTodo: '#hideShowTodo',
            userList: '#user-list'
        },

        events: {
            'click @ui.addTodo': 'onCreateTodo',
            'click @ui.resetAllTodo': 'onResetTodo',
            'click @ui.hideShowTodo': 'onHideShowTodo',
            'click @ui.hideShowTodo': 'onHideShowTodo',
            'click @ui.deleteAllTodo': 'onDeleteAllTodo',
            'keypress @ui.newTodo': 'onKeyPressNewTodo'
        },


        initialize: function (options) {
            _.bindAll(this, 'onCreatedSuccess');
            this.userList = options.userList;
            this.listenTo(this.newTodoModel, 'invalid', this.renderErrorMessage);


        },

        onRender: function () {
            //ユーザ一覧を表示
            this.showUserList(this.ui.userList, this.userList);
            //ログインユーザをデフォルトで選択状態にする
            this.ui.userList.val(window.application.loginUser.id);
        },

        //ユーザ一覧を表示
        showUserList: function ($list, userList) {
            $.each(userList, function (index, userModel) {

                $list.append(
                    "<option value='"
                    + userModel.attributes.id + "'>"
                    + userModel.attributes.name + "</option>");
            });
        },


        onKeyPressNewTodo: function (event) {
            if (event.keyCode == 13) { //press Enter
                if (!this.onCreateTodo()) {
                    event.preventDefault();
                }

            } else if (event.keyCode === 10) { //press Ctrl + Enter
                $(this.ui.newTodo).val(function (i, val) {
                    return val + "\n"; //break line
                });
            }


        },

        onDeleteAllTodo: function () {

            var _this = this;
            bootbox.confirm("are you sure to Delete all TODO?", function (confirmed) {
                if (confirmed) {
                    _this.collection.deleteAll();
                }
            })

        },


        onCreateTodo: function () {
            this.newTodoModel.clear({silent : true});
                       this.newTodoModel.set(this.newAttributes());
                      this.collection.create(this.newTodoModel, {
                    silent: true,
                    success: this.onCreatedSuccess
                });
                this.ui.newTodo.val('');
                return true;

        },

        newAttributes: function () {

            return {
                todo: this.ui.newTodo.val().trim(),
                status: 0,
                assignee: this.ui.userList.val()

            };
        },

        onCreatedSuccess: function () {
            this.collection.fetch({reset: true});
        },

        onResetTodo: function () {
            if (confirm("Do you want to uncheck all TODO?")) {
                this.collection.resetAll();
                this.render();
            }

        },

        templateHelpers: function () {
            return {
                hided: this.collection.hided
            }
        },

        onHideShowTodo: function () {
            if (this.collection.hided) {
                this.collection.showFull();
            } else {
                this.collection.hideDone();
            }

        },

        onShow: function () {
            console.log('composite view showed!')
            $(this.ui.newTodo).focus();
        },


              renderErrorMessage : function(errors){
                  var message = '';
                  for(var key in errors.validationError){
                           message += errors.validationError[key];
                      }
                  bootbox.alert(message);
              }


    });


    return TodoCompositeView;
});
