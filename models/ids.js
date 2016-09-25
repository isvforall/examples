var mongoose = require ('mongoose');

var config = require ('../config');

var untaken = config.messages.untaken;

var idSchema = mongoose.Schema({
  ID: {
    type: String,
    unique: true
  },
  ServerName: {
    type: String,
    required: true
  }
});

var ID = mongoose.model('ID', idSchema);

function findId(id, callback) {
  ID.find({
    ID: id
  }, function(err, ids) {
      if (err) {
        return errorHandler(err);
      }
      callback(ids);
    });
}

function findAll(callback) {
  ID.find({}, function(err, ids) {
    if (err) {
      return errorHandler(err);
    }
    callback(ids);
  });
}

function saveId(id, server, callback) {
  new ID({
    ID: id,
    ServerName: server
  }).save(function(err) {
    if (err) {
      errorHandler(err);
    }
    if (typeof (callback) !== 'undefined') {
      callback();
    }
  });
}

function saveAll(arr, callback) {
  ID.create(arr, function(err, ids) {
    if (err) {
      errorHandler(err);
    }
    if (typeof (callback) !== 'undefined') {
      callback();
    }
  });
}

function removeId(id, callback) {
  ID.remove({
    ID: id
  }, function(err) {
      if (err) {
        errorHandler(err);
      }
      if (typeof (callback) !== 'undefined') {
        callback();
      }
    });
}

function take(id, server, callback) {
  ID.update({
    ID: id,
    ServerName: server
  });
}

function untake(id, callback) {
  ID.update({
    ID: id,
    ServerName: untaken
  });
}

function dropAll(callback) {
  ID.remove({}, function(err) {
    if (err) {
      return errorHandler(err);
    }
    if (typeof (callback) !== 'undefined') {
      callback();
    }
  });
}

function loadIntoMemery(callback) {
  return function(server, that, thenDo) {
    ID.find({
      ServerName: "Server " + server
    }, function(err, ids) {
        if (err) {
          return errorHandler(err);
        }
        callback(ids, that, thenDo);
      });
  };
}

function errorHandler(err) {
  if (err.code === 11000) {
  // console.error('The ID already exits');
  } else {
    // console.error('Error ' + err);
  }
}

exports.findId = findId;

exports.findAll = findAll;

exports.saveId = saveId;

exports.saveAll = saveAll;

exports.removeId = removeId;

exports.take = take;

exports.untake = untake;

exports.dropAll = dropAll;

exports.loadIntoMemery = loadIntoMemery;



