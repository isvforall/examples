var net = require ('net');

var config = require ('./config');

var network = config.network;

var db = require('./db');

var internalPort = config.internalPort;

var yes = config.messages.yes,
  no = config.messages.no,
  untaken = config.messages.untaken;


function askServer(server, id, socket, that) {
  var communication = net.connect({
    port: server.internalPort,
    host: server.ip
  }, function() {
      communication.write(id + '\r\n');
    });
  communication.on('data', function(data) {
    data = data.toString().trim();
    if (data == yes) {
      socket.write(yes + ' ' + server.name + '\r\n');
    } else if (data == no) {
       socket.write(yes + ' ' + that.config.name + '\r\n');
       db.addOneId(id, that.config.name);
    }
    // return communication.end();
  });
  communication.on('end', function() {
    console.log('disconnected from server');
  });
}

function getAddressByName(serverName) {
  if (serverName in network) {
    return network[serverName];
  } else {
    return "";
  }
}

exports.askServer = askServer;

