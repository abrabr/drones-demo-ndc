'use strict';

var Cylon = require('cylon');

var STEPS = 2;

var TURN_TRESHOLD = 0.3,
    TURN_SPEED_FACTOR = 10.0;

var DIRECTION_THRESHOLD = 0.25,
    DIRECTION_SPEED_FACTOR = 0.5;

var UP_CONTROL_THRESHOLD = 50,
    UP_SPEED_FACTOR = 0.1,
    CIRCLE_THRESHOLD = 1.5;

var handStartPosition = [],
    handStartDirection = [];

var handWasClosedInLastFrame = false;

Cylon.robot({

    connections: {
        //'rolling-spider': { adaptor: 'rolling-spider', module: 'cylon-rolling-spider-swarm', uuid:'daa2f6fd67ee44f6bb1f78e698e0f170'}, //RS_R033811 Rød 1
        //'rolling-spider': { adaptor: 'rolling-spider', module: 'cylon-rolling-spider-swarm', uuid:'b0cbcc5a717343f19e9fe92dc397acb9'}, //RS_R032641 Rød 2
        //'rolling-spider': { adaptor: 'rolling-spider', module: 'cylon-rolling-spider-swarm', uuid:'3d465913364849138f181bce99673f51'}, //RS_B020918 Blå        
        'keyboard': { adaptor: 'keyboard' },
        'leapmotion': { adaptor: 'leapmotion' }
    },

    devices: {
        //drone: { driver: 'rolling-spider', module: 'cylon-rolling-spider-swarm', connection: 'rolling-spider' },
        keyboard: { driver: 'keyboard', connection:'keyboard' },
        leapmotion: { driver: 'leapmotion', connection: 'leapmotion' }
    },

    work: function (my) {

        //my.drone.wheelOff();
        //my.drone.flatTrim();

        my.leapmotion.on('gesture', function(gesture) {
            if (gesture.type=='circle' && gesture.state=='stop' && gesture.progress > CIRCLE_THRESHOLD ){
                if (gesture.normal[2] < 0) {
                    
                    console.log("Takeoff");
                    //my.drone.takeOff();
                };

                if (gesture.normal[2] > 0) {
                    console.log("Land")
                    //my.drone.land();
                }
            }

        });



        my.leapmotion.on('hand', function(hand) {

            var signal, value;
 

            if (handStartDirection.length > 0 && handStartPosition.length >0){
                var horizontal = Math.abs(handStartDirection[0] - hand.direction[0]),
                vertical = Math.abs(hand.palmPosition[1] - handStartPosition[1]);
   

                // TURNS
                if (horizontal > TURN_TRESHOLD) {
                  signal = handStartDirection[0] - hand.direction[0];
                  value = (horizontal - TURN_TRESHOLD) * TURN_SPEED_FACTOR;

                  if (signal > 0) {
                    console.log("Counterclockwise: " + value + " steps")
                    //my.drone.counterClockwise(value);
                  }

                  if (signal < 0) {
                    console.log("Clockwise: " + value + " steps")
                    //my.drone.clockwise(value);
                  }
                }

                // UP and DOWN
                if (vertical > UP_CONTROL_THRESHOLD) {
                  if ((hand.palmPosition[1] - handStartPosition[1]) >= 0) {
                    signal = 1;
                  } else {
                    signal = -1;
                  }

                  value = Math.round(vertical - UP_CONTROL_THRESHOLD) * UP_SPEED_FACTOR;

                  if (signal > 0) {
                    console.log("Up: " + value + " steps")
                    //my.drone.up(value);
                  }

                  if (signal < 0) {
                     console.log("Down: " + value + " steps") 
                    //my.drone.down(value);
                  }
                }

                // DIRECTION FRONT/BACK
            if ((Math.abs(hand.palmNormal[2]) > DIRECTION_THRESHOLD)) {
              if (hand.palmNormal[2] > 0) {
                value = Math.abs(
                  Math.round(hand.palmNormal[2] * 10 + DIRECTION_THRESHOLD) *
                  DIRECTION_SPEED_FACTOR
                );
                console.log("Forward: " + value + " steps")
                //my.drone.forward(value);
              }

              if (hand.palmNormal[2] < 0) {
                value = Math.abs(
                  Math.round(hand.palmNormal[2] * 10 - DIRECTION_THRESHOLD) *
                  DIRECTION_SPEED_FACTOR
                );
                console.log("Backward: " + value + " steps")
                //my.drone.backward(value);
              }
            }

            // DIRECTION LEFT/RIGHT
            if (Math.abs(hand.palmNormal[0]) > DIRECTION_THRESHOLD) {
              if (hand.palmNormal[0] > 0) {
                value = Math.abs(
                  Math.round(hand.palmNormal[0] * 10 + DIRECTION_THRESHOLD) *
                  DIRECTION_SPEED_FACTOR
                );
                console.log("Left: " + value + " steps")
                //my.drone.left(value);
              }

              if (hand.palmNormal[0] < 0) {
                value = Math.abs(
                  Math.round(hand.palmNormal[0] * 10 - DIRECTION_THRESHOLD) *
                  DIRECTION_SPEED_FACTOR
                );
                console.log("Right: " + value + " steps")
                //my.drone.right(value);
              }
            }



            } else {
                handStartDirection = hand.direction;
                handStartPosition = hand.palmPosition;
            }
            

            
        });



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