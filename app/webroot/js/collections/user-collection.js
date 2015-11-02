//User list collection
define(function(require) {
    var UserModel = require('models/user-model');

    var UserCollection = Backbone.Collection.extend({
        url : '/rest-study/users.json',
        model : UserModel,

        parse : function(response) {
            return response;
        }
    });

    return UserCollection;
});