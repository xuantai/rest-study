define(function () {
    var TodoDetailItemView = Backbone.Marionette.ItemView.extend({

        //テンプレート
        template: "#todo-detail-item-template",

        ui: {
            todoStatus: '#edit-todo',
            updateButton: '#updateTodo',
            cancelButton: '#updateCancel',
            fullTemplate: '#todo-detail-item-template',
            userList: '#user-list'

        },

        //DOMイベントハンドラ設定
        events: {
            //更新ボタンクリック時
            'click @ui.updateButton': 'onUpdateClick',
            //キャンセルボタンクリック時
            'click @ui.cancelButton': 'onCancelClick',
            'keypress @ui.todoStatus': 'onPressUpdateTodo',
            'keydown @ui.todoStatus': 'onKeyDownTodo'
        },

        //初期化
        initialize: function (options) {
            _.bindAll(this, 'onSaveSuccess');
            console.log("get userlist in deltail");
            console.log(options.userList);
            this.userList = options.userList;
        },

        onRender: function () {
            //ユーザ一覧を表示
            this.showUserList(this.ui.userList, this.userList);
            //担当者を選択状態にする
            this.ui.userList.val(this.model.attributes.assignee);
        },

        //ユーザ一覧を表示
        showUserList: function ($list, userList) {
            debugger;
            $.each(userList, function (index, userModel) {
                $list.append(
                    "<option value='"
                    + userModel.attributes.id + "'>"
                    + userModel.attributes.name + "</option>");
            });
        },

        onPressUpdateTodo: function (event) {
            console.log(event.keyCode);
            if (event.keyCode == 13) { //press Enter

                if (!this.onUpdateClick()) {
                    event.preventDefault();
                }
            } else if (event.keyCode == 10) { //press Ctrl Enter

                $(this.ui.todoStatus).val(function (i, val) {
                    return val + "\n";
                });
            }

        },

        onKeyDownTodo: function (event) {
            console.log(event.keyCode);
            if (event.keyCode == 27) { //press Esc
                this.onCancelClick()
            }
        },


        //更新ボタンクリックのイベントハンドラ
        onUpdateClick: function () {
            //テキストボックスから文字を取得
            var todoString = this.ui.todoStatus.val();
           var assigneeId = this.ui.userList.val();    // 担当者
            if (todoString.length > 10) {
                this.model.save({
                    todo: todoString,
                    assignee : assigneeId
                }, {
                    silent: true,
                    success: this.onSaveSuccess,
                });
                return true;
            } else {
                alert("length of content must be more than 10 characters");
                return false;
            }

        },

        //キャンセルボタンクリックのイベントハンドラ
        onCancelClick: function () {

            this.backTodoLists();
        },

        //更新成功
        onSaveSuccess: function () {
            this.backTodoLists();
        },

        //TODOリスト画面に戻る
        backTodoLists: function () {
            Backbone.history.navigate('#todo-lists', true);
        }

    });
    return TodoDetailItemView;
});