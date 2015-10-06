var app = app || {};


(function(app) {
           app.Application = Backbone.Marionette.Application.extend({
                      initialize : function(){
                             new app.TodoRouter();
                      },

                      onStart : function(){
                              Backbone.history.start();
                       },

               regions : {
                          mainRegion : '#main'
           }

           });
})(app);