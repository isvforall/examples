var net = require ('net');
var confi = require ('./config.js');
var db = require('./db');
var timer = require('./timer.js');
var comm = require('./communication.js');

var Memory = require('./memory').Memory;

function Server(config) {
  this.config = config;
  this.memory = new Memory();
  var that = this;

  var approvedClients = confi.approvedClients;

  var internalServers = confi.internalServers;

  var neighborhood = confi.messages.neighborhood,
    yes = confi.messages.yes,
    no = confi.messages.no,
    untaken = confi.messages.untaken;

  this.serverProcess = function serverProcess(id, socket, network) {
    id = id.toString().trim();
    if (that.memory.serves(id)) {
      socket.write(yes + '\r\n');
    } else {
      db.findId(id, function(res) {
        if (res.length === 0) return;
        var serv = res[0]["ServerName"];
        if (serv.split(" ")[0] == neighborhood) {
          comm.askServer(network[serv], id, socket, that);
        } else if (serv.split(" ")[0] == untaken) {
          takeId(id, that.name);
          socket.write(yes + '\r\n');
        }
      });
    }
  };

  this.fromNeighborhood = function fromNeighborhood(data, socket) {
    data = data.toString().trim();
    if (data.indexOf("ID") === 0) {
      if (that.memory.serves(data)) {
        socket.write(yes + '\r\n');
      } else {
        socket.write(no + '\r\n');
      }
    } else {
      console.log(data);
    }
  };

  function takeId(id, server) {
    db.takeId(id, 'Server ' + server);
    that.memory.add(id);
  }

}

Server.prototype.run = function() {
  var that = this;
  this.memory.load(this.config.name, that, function() {

    var port = that.config.network["Server " + that.config.name].port;
    var internalPort = that.config.network["Server " + that.config.name].internalPort;

    var main = net.createServer(function(socket) {
      // socket.write('Welcome, you are on the server: ' + name + ' \r\n');
      socket.on('data', function(data) {
        that.serverProcess(data, socket, that.config.network);
      });
      socket.on('close', function(data) {
      });
    });
    // main.listen(port, approvedClients);
    main.listen(port);

    var internal = net.createServer(function(socket) {
      socket.write('Internal server\r\n');
      socket.on('data', function(data) {
        that.fromNeighborhood(data, socket);
      });
      socket.on('close', function(data) {
      });
    });

    // internal.listen(internalPort, internalServers);
    internal.listen(internalPort);

    if (that.config.timer) {
      timer.start(that);
    }
  });
};

module.exports = Server;


