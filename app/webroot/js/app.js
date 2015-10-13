//Application
console.log('load app');
define(function(require){
    console.log('run app');
    var Router = require('routers/router');
    var Application = Marionette.Application.extend({
        initialize : function(){
            console.log('app.initialize');
            new Router();
        },

        onStart : function(){
            Backbone.history.start();
        },

        regions : {
            mainRegion : '#main'
        }

    });
    return Application;
});