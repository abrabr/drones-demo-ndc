Install cylon: npm install cylon
Install cylon support for keyboard: npm install cylon-keyboard
Install cylon support for Leap Motion: 

Simple drones:

To run the simple drone demo, install the cylon-rolling-spider module: npm install cylon-rolling-spider 

To discover your drone(s):




To run the demo:

node drone-wheelsoff-keyboard.js

With debug: 

DEBUG=rollingspider node drone-wheelsoff-keyboard.js

Swarm: 

If you wish to run the swarm example, you need install my forked repo of cylon-rolling-spider, awaiting my submission of a pull request to the cylon-rolling-spider project:

npm install git://github.com/abrabr/cylon-rolling-spider

It exposes the swarm api from the node-rolling-spider project used by cylon-rolling-spider. 

To run the demo:

node swarm-wheelsoff-keyboard.js







