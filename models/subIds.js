var mongoose = require ('mongoose');

var subIdSchema = mongoose.Schema({
  ID: String,
  Sub_ID: String
});

var SubID = mongoose.model('SUB_ID', subIdSchema);

SubID.collection.ensureIndex({
  ID: 'text',
  Sub_ID: 'text'
}, {
    unique: true
  }, function(error, res) {
    if (error) {
      return console.error('failed ensureIndex with error', error);
    }
    // console.log('ensureIndex succeeded with response', res);
  });

function findId(id, callback) {
  SubID.find({
    ID: id
  }, function(err, subids) {
      if (err) {
        return errorHandler(err);
      }
      callback(subids);
    });
}

function findAll(callback) {
  SubID.find({}, function(err, ids) {
    if (err) {
      return errorHandler(err);
    }
    callback(ids);
  });
}

function saveId(id, subid, callback) {
  new SubID({
    ID: id,
    Sub_ID: subid
  }).save(function(err) {
    if (err) {
      return errorHandler(err);
    }
    if (typeof (callback) !== 'undefined') {
      callback();
    }
  });
}

function saveAll(arr, callback) {
  SubID.create(arr, function(err, ids) {
    if (err) {
      errorHandler(err);
    }
    if (typeof (callback) !== 'undefined') {
      callback();
    }
  });
}

function removeId(id, subid, callback) {
  SubID.remove({
    ID: id,
    Sub_ID: subid
  }, function(err) {
      if (err) {
        return errorHandler(err);
      }
      if (typeof (callback) !== 'undefined') {
        callback();
      }
    });
}

function dropAll(callback) {
  SubID.remove({}, function(err) {
    if (err) {
      return errorHandler(err);
    }
    if (typeof (callback) !== 'undefined') {
      callback();
    }
  });
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

exports.dropAll = dropAll;



