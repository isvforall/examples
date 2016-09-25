var mongoose = require('mongoose'),
  config = require('./config'),
  ids = require('./models/ids.js'),
  subIds = require('./models/subIds.js'),
  ID = ids.ID,
  SubID = subIds.SubID;

mongoose.connect(config.mongoURL);

// db.on('error', handleError);

exports.loadIntoMemery = ids.loadIntoMemery;

exports.saveId = ids.saveId;

exports.saveAllIds = ids.saveAll;

exports.removeId = ids.removeId;

exports.findId = ids.findId;

exports.findAllIds = ids.findAll;

exports.dropAllIds = ids.dropAll;

exports.takeId = ids.take;

exports.untakeId = ids.untake;

exports.saveSubId = subIds.saveId;

exports.saveAllSubIds = subIds.saveAll;

exports.findSubId = subIds.findId;

exports.removeSubId = subIds.removeId;

exports.dropAllSubId = subIds.dropAll;

exports.closeDb = function() {
  mongoose.disconnect();
};
