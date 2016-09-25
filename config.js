
var HOST_FOR_SERVER = 'localhost';

var HOST_FOR_CLIENT = 'localhost';

var PORT = 12341;

var INTERNAL_PORT = 12345;

var approvedClients = ['localhost'];

var internalServers = ['localhost'];

var MONGO_URL = 'mongodb://192.168.29.13/nodejs';

var network = {
  "Server A": {
    ip: "192.168.29.10",
    name: "A",
    port: PORT,
    internalPort: INTERNAL_PORT
  },
  "Server B": {
    ip: "192.168.29.11",
    name: "B",
    port: PORT,
    internalPort: INTERNAL_PORT
  },
  "Server C": {
    ip: "192.168.29.12",
    name: "C",
    port: PORT,
    internalPort: INTERNAL_PORT
  }
};

var messages = {
  yes: "YES",
  no: "NO",
  untaken: "UNTAKEN",
  neighborhood: "Server"
};

exports.port = PORT;

exports.internalPort = INTERNAL_PORT;

exports.hostServer = HOST_FOR_SERVER;

exports.hostClient = HOST_FOR_CLIENT;

exports.mongoURL = MONGO_URL;

exports.approvedClients = approvedClients;

exports.internalServers = internalServers;

exports.network = network;

exports.messages = messages;

