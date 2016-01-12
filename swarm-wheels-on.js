'use strict';

var Cylon = require('cylon');

Cylon.robot({

    connections: {
        'rolling-spider-swarm': { adaptor: 'rolling-spider-swarm', uuid:'daa2f6fd67ee44f6bb1f78e698e0f170,b0cbcc5a717343f19e9fe92dc397acb9'}, //RS_R033811 Rød 1
        //'rolling-spider': { adaptor: 'rolling-spider', uuid:'b0cbcc5a717343f19e9fe92dc397acb9'}, //RS_R032641 Rød 2
        //'rolling-spider': { adaptor: 'rolling-spider', uuid:'3d465913364849138f181bce99673f51'}, //RS_B020918 Blå
        'keyboard': { adaptor: 'keyboard' }
    },

    devices: {
        swarm: { driver: 'rolling-spider-swarm', connection: 'rolling-spider-swarm' },
        keyboard: { driver: 'keyboard', connection:'keyboard' }
    },

    work: function (my) {

        my.swarm.wheelOn();
        my.swarm.flatTrim();

        my.keyboard.on('up', function(key) { 
            my.swarm.takeOff();
            my.swarm.hover();
        });

        my.keyboard.on('down', function(key) { 
            my.swarm.land();
        });

        my.keyboard.on('f', function(key) { 
            my.swarm.frontFlip();
        });
        
    }

}).start();