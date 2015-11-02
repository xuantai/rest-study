//Bắt đầu
console.log('load main');
require([
        'marionette'
    ],
    function(){
        console.log('run main');
        require(['app'], function(Application){
            console.log('run main2');
            window.application = new Application();

        });
    });