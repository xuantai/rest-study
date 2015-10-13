define(function(require) {
	var TodoCompositeView = require('views/todo-composite-view');
	var TodoCollection = require('collections/todo-collection')
	var TodoLayoutView = Backbone.Marionette.LayoutView.extend({
		//テンプレート
		template: '#todo-layout-template',

		regions : {
			listRegion : '#todo-lists',
		},

		onRender : function(){
			var todoCollection = new TodoCollection();
			this.listenTo(todoCollection , 'reset', this.showTodoList, this);
			todoCollection.fetch({reset : true});
		},

		showTodoList : function(todoCollection){
			this.listRegion.show( new TodoCompositeView({
				collection : todoCollection
			}));
		},

	});
	return TodoLayoutView;
});