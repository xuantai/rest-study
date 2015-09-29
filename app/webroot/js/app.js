var app = app || {};

//B?t ??u
(function(app) {
    var todoRouter = new app.TodoRouter();  // ‡@
    Backbone.history.start();               // ‡A
})(app);