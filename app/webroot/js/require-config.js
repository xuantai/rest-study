// cấu hình require
var require = {

    // Chặn cache
    urlArgs: "v=" + (new Date()).getTime(),

    // Xác định base URL mà module sẽ đọc
    baseUrl: '/rest-study/js/',

    // Xác định path của từng file
    paths : {
        'jquery' : 'lib/jquery-2.1.3.min',
        'underscore' : 'lib/underscore-min',
        'backbone' : 'lib/backbone-min',
        'marionette' : 'lib/backbone.marionette.min',
    },

    // Xác định sự phụ thuộc
    shim : {
        'jquery' : {
            exports : '$'
        },
        'underscore' : {
            deps : ['jquery'],
            exports : '_'
        },
        'backbone' : {
            deps : ['jquery', 'underscore'],
            exports : 'Backbone'
        },
        'marionette' : {
            deps : ['backbone'],
            exports : 'Marionette'
        },
    }
};