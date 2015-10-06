var app = app || {};

//View trang detail
(function(app) {
    app.TodoDetailItemView = Backbone.Marionette.ItemView.extend({

        //Template
        template: "#todo-detail-item-template",

        ui : {
            todoStatus   : '#edit-todo',
            updateButton : '#updateTodo',
            cancelButton : '#updateCancel'
        },

        //Xử lý các sự kiện trong DOM
        events : {
            //Click nút chỉnh sửa
            'click @ui.updateButton' : 'onUpdateClick',
            //Click nút Cancel
            'click @ui.cancelButton' : 'onCancelClick',
        },

        //Khởi tạo
        initialize: function(){
            _.bindAll( this, 'onSaveSuccess' );
        },

        //Xử lý sự kiện click nút Update
        onUpdateClick : function() {
            //Lấy ký tự từ checkbox
            var todoString = this.ui.todoStatus.val();
            this.model.save({
                todo : todoString
            }, {
                silent : true,
                success : this.onSaveSuccess,
            });
        },

        //Xử lý sự kiện click nút Cancel
        onCancelClick : function() {
            this.backTodoLists();
        },

        //Sửa thành công
        onSaveSuccess : function() {
            this.backTodoLists();
        },

        //Trở lại màn hình danh sách TODO
        backTodoLists : function() {
            Backbone.history.navigate('#todo-lists', true);
        }

    });
})(app);