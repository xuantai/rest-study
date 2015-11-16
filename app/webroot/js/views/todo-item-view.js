define(function (require) {
    var bootbox = require('bootbox');
    var TodoItemView = Backbone.Marionette.ItemView.extend({
        //DOMに要素追加のタグ名
        tagName: 'tr',

        //テンプレート
        template: '#todo-item-template',


        ui: {
            checkBox: '.toggle',
            removeLink: '#remove-link',
            detailLink: '#detail-link'
        },

        //DOMイベントハンドラ設定
        events: {
            //チェックボックスクリック時
            'click @ui.checkBox': 'onStatusToggleClick',
            //削除ボタンクリック時
            'click @ui.removeLink': 'onRemoveClick',
        },

        onStatusToggleClick: function () {
            this.model.toggle();
        },

        onRemoveClick: function () {
            var _this = this;
            bootbox.confirm("Are you sure to delete this TODO?", function (confirmed) {
                if (confirmed) {
                    _this.model.destroy({
                        wait: true
                    });
                }
            });


        },

        onRender: function () {
            if (!this.model.attributes.owned) {
                //オーナでない場合は削除リンク非表示
                this.ui.removeLink.css({
                    display: 'none'
                });

                if (!this.model.attributes.assigned) {
                    //担当者でもない場合は、
                    //詳細リンクも非表示
                    this.ui.detailLink.css({
                        display: 'none'
                    });
                    //チェックボックスも変更不可
                    this.ui.checkBox.prop('disabled', true);
                }
            }
        }


    });
    return TodoItemView;
});
