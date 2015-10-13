//controller
console.log('load controller');
define(function() {
	console.log('run controller');
	var TodoController = Marionette.Controller.extend({

		todoLists : function() {
			//Routing tới view cho Todo layout
			this.nextView('views/todo-layout-view');
		},

		todoDetail : function(id) {
			this.nextView('views/todo-detail-layout-view', {modelId : id});
		},

		nextView : function(viewPath, option) {
			require([viewPath], function(View){
				window.application.mainRegion.show(new View(option));
			});
		},

	});
	return TodoController;
});