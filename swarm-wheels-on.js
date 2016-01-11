'use strict';

var Cylon = require('cylon');

Cylon.robot({

    connections: {
        'rolling-spider-swarm': { adaptor: 'rolling-spider-swarm', uuid:'daa2f6fd67ee44f6bb1f78e698e0f170,b0cbcc5a717343f19e9fe92dc397acb9'}, //RS_R033811 Rød 1
        //'rolling-spider': { adaptor: 'rolling-spider', uuid:'b0cbcc5a717343f19e9fe92dc397acb9'}, //RS_R032641
        'keyboard': { adaptor: 'keyboard' }
    },

    devices: {
        swarm: { driver: 'rolling-spider-swarm', connection: 'rolling-spider-swarm' },
        keyboard: { driver: 'keyboard', connection:'keyboard' }
    },

    work: function (my) {

        // my.drone.wheelOn();
        // my.drone.flatTrim();

        my.drone.takeOff();

        my.keyboard.on('up', function(key) { 
            my.drone.takeOff();
        });

        my.keyboard.on('down', function(key) { 
            my.drone.land();
        });

        
    }

}).start();