define(function() {
	var TodoItemView = Backbone.Marionette.ItemView.extend({
		//DOMに要素追加のタグ名
		tagName : 'tr',

		//テンプレート
		template : '#todo-item-template',

		ui : {
			checkBox : '.toggle',
			removeLink : '.remove-link'
		},

		//DOMイベントハンドラ設定
		events : {
			//チェックボックスクリック時
			'click @ui.checkBox' : 'onStatusToggleClick',
			//削除ボタンクリック時
			'click @ui.removeLink' : 'onRemoveClick',
		},

		onStatusToggleClick : function() {
			this.model.toggle();
		},

		onRemoveClick : function() {
			if (confirm ("Are you sure to delete this ToDo?")) {
				this.model.destroy({
					wait: true
				});
			}
		},

	});
    return TodoItemView;
});
