var config = require('./config.js');
var Server = require('./server');
var name = process.argv[2];

var server = new Server({
  name: name,
  network: config.network,
  timer: false
});

server.run();


