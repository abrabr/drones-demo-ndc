'use strict';

var Cylon = require('cylon');

var STEPS = 2;

Cylon.robot({

    connections: {
        //'rolling-spider': { adaptor: 'rolling-spider', module: 'cylon-rolling-spider-swarm', uuid:'daa2f6fd67ee44f6bb1f78e698e0f170'}, //RS_R033811 Rød 1
        'rolling-spider': { adaptor: 'rolling-spider', module: 'cylon-rolling-spider-swarm', uuid:'b0cbcc5a717343f19e9fe92dc397acb9'}, //RS_R032641 Rød 2
        //'rolling-spider': { adaptor: 'rolling-spider', module: 'cylon-rolling-spider-swarm', uuid:'3d465913364849138f181bce99673f51'}, //RS_B020918 Blå        
        'keyboard': { adaptor: 'keyboard' }
    },

    devices: {
        drone: { driver: 'rolling-spider', module: 'cylon-rolling-spider-swarm', connection: 'rolling-spider' },
        keyboard: { driver: 'keyboard', connection:'keyboard' }
    },

    work: function (my) {

        my.drone.wheelOff();
        my.drone.flatTrim();


        my.keyboard.on('t', function(key) { 
            my.drone.takeOff();
        });

        my.keyboard.on('l', function(key) { 
            my.drone.land();
        });

        my.keyboard.on('e', function(key) { 
            my.drone.emergency();
        });


        my.keyboard.on('u', function(key) { 
            my.drone.up({steps: STEPS});
        });

        my.keyboard.on('d', function(key) { 
            my.drone.down({steps: STEPS});
        });


        my.keyboard.on('a', function(key) { 
            my.drone.left({steps: STEPS});
        });

        my.keyboard.on('s', function(key) { 
            my.drone.right({steps: STEPS});
        });


        my.keyboard.on('z', function(key) { 
            my.drone.frontFlip({steps: STEPS});
        });

        my.keyboard.on('x', function(key) { 
            my.drone.backFlip({steps: STEPS});
        });


        my.keyboard.on('q', function(key) { 
            my.drone.leftFlip({steps: STEPS});
        });

        my.keyboard.on('w', function(key) { 
            my.drone.rightFlip({steps: STEPS});
        });



        my.keyboard.on('up', function(key) { 
            my.drone.forward({steps: STEPS});
        });

        my.keyboard.on('down', function(key) { 
            my.drone.backward({steps: STEPS});
        });

        my.keyboard.on('right', function(key) { 
            my.drone.clockwise({steps: STEPS});
        });

        my.keyboard.on('left', function(key) { 
            my.drone.counterClockwise({steps: STEPS});
        });



    }

}).start();