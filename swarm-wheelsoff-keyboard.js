'use strict';

var Cylon = require('cylon');

var STEPS = 2;

Cylon.robot({

    connections: {
        'rolling-spider-swarm': { adaptor: 'rolling-spider-swarm', module: 'cylon-rolling-spider-swarm', uuid:'daa2f6fd67ee44f6bb1f78e698e0f170,b0cbcc5a717343f19e9fe92dc397acb9,3d465913364849138f181bce99673f51'}, //RS_R033811 Rød 1
        //'rolling-spider': { adaptor: 'rolling-spider', uuid:'b0cbcc5a717343f19e9fe92dc397acb9'}, //RS_R032641 Rød 2
        //'rolling-spider': { adaptor: 'rolling-spider', uuid:'3d465913364849138f181bce99673f51'}, //RS_B020918 Blå
        'keyboard': { adaptor: 'keyboard' }
    },

    devices: {
        swarm: { driver: 'rolling-spider-swarm', connection: 'rolling-spider-swarm' },
        keyboard: { driver: 'keyboard', connection:'keyboard' }
    },

    work: function (my) {

        my.swarm.wheelOff();
        my.swarm.flatTrim();
        
        my.keyboard.on('space', function(key) { 
            my.swarm.wheelOff();
        my.swarm.flatTrim();;
        });


        my.keyboard.on('t', function(key) { 
            my.swarm.takeOff();
        });

        my.keyboard.on('l', function(key) { 
            my.swarm.land();
        });

        my.keyboard.on('e', function(key) { 
            my.swarm.emergency();
        });


        my.keyboard.on('u', function(key) { 
            my.swarm.up({steps: STEPS});
        });

        my.keyboard.on('d', function(key) { 
            my.swarm.down({steps: STEPS});
        });


        my.keyboard.on('a', function(key) { 
            my.swarm.left({steps: STEPS});
        });

        my.keyboard.on('s', function(key) { 
            my.swarm.right({steps: STEPS});
        });


        my.keyboard.on('z', function(key) { 
            my.swarm.frontFlip({steps: STEPS});
        });

        my.keyboard.on('x', function(key) { 
            my.swarm.backFlip({steps: STEPS});
        });


        my.keyboard.on('q', function(key) { 
            my.swarm.leftFlip({steps: STEPS});
        });

        my.keyboard.on('w', function(key) { 
            my.swarm.rightFlip({steps: STEPS});
        });



        my.keyboard.on('up', function(key) { 
            my.swarm.forward({steps: STEPS});
        });

        my.keyboard.on('down', function(key) { 
            my.swarm.backward({steps: STEPS});
        });

        my.keyboard.on('right', function(key) { 
            my.swarm.clockwise({steps: STEPS});
        });

        my.keyboard.on('left', function(key) { 
            my.swarm.counterClockwise({steps: STEPS});
        });

        
    }

}).start();