var net = require ('net');
var readline = require ('readline');

var config = require ('./config');

var network = config.network;

var port = config.port;

var rl = readline.createInterface(process.stdin, process.stdout);

// rl.setPrompt('client> ');
// rl.prompt();

rl.question("Choose to which server you are wish to connect [A, B, C]: ", function(answer) {
  var server = answer.trim();
  var ip = getIpByName(server);
  if (ip === "") {
    console.log('Wrong name');
    process.exit(0);
  }
  var client = net.connect({
    host: ip,
    port: port
  }, function() {
      console.log('To exit type \'exit\'');
      rl.setPrompt('client [Server ' + server + ']> ');
      rl.prompt();
      rl.on('line', function(line) {
        if (line === "exit") {
          rl.close();
        } else if (line.indexOf('ID') != 0) {
          console.log('Wrong ID. Please, input in this format \'ID<number>\'');
        } else {
          client.write(line + '\r\n');
        }
        rl.prompt();
      });
      rl.on('close', function() {
        process.exit(0);
        client.end();
      });
    });
  client.on('data', function(data) {
    console.log(data.toString().trim());
    rl.prompt();
  });
  // client.on('error', function(data) {
    // console.log('Couldn\'t connect');
    // process.exit(0);
  // });
  // client.on('end', function() {
  // rl.write('Disconnected from server', server);
  // });
});


function getIpByName(serverName) {
  for (server in network) {
    var name = server.split(" ")[1];
    if (name == serverName) {
      return network[server];
    }
  }
  return "";
}

exports.getIpByName = getIpByName;

