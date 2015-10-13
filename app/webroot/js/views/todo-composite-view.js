define (function(require){
	var TodoItemView = require ('views/todo-item-view');
 	var TodoCompositeView = Backbone.Marionette.CompositeView.extend({
		template: '#todo-composite-template',

		childView : TodoItemView,

		childViewContainer : 'tbody',

		ui : {
			addTodo : '#addTodo',
			newTodo : '#new-todo',
			resetAllTodo :'#resetAllTodo',
			hideShowTodo : '#hideShowTodo'
		},

		events : {
			'click @ui.addTodo' : 'onCreateTodo',
			'click @ui.resetAllTodo' : 'onResetTodo',
			'click @ui.hideShowTodo' : 'onHideShowTodo'
		},

		initialize: function(){
			_.bindAll( this, 'onCreatedSuccess' );
		},

		templateHelpers: function () {
			return {
				hided: this.collection.hided
			}
		},

		onCreateTodo : function() {

			this.contentLength = this.ui.newTodo.val().length;
			if (this.contentLength >10 ){
				this.collection.create(this.newAttributes(), {
					silent:  true ,
					success: this.onCreatedSuccess
				});
				this.ui.newTodo.val('');
			}else {
				alert ("Length of content must be more than 10 characters")
			}


		},

		newAttributes : function() {

			return {
				todo : this.ui.newTodo.val().trim(),
				status : 0
			};
		},

		onCreatedSuccess : function(){
			this.collection.fetch({ reset : true });
		},

		onResetTodo : function(){
			if (confirm ("Do you want to uncheck all TODO?")){
				this.collection.resetAll();
				this.render();
			}

		},
		onHideShowTodo : function(){
			if(this.collection.hided){
				this.collection.showFull();
			} else{
				this.collection.hideDone();
			}

		}

	});
	return TodoCompositeView;
});
