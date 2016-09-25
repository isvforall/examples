var db = require ('./db');

function Memory() {
  this.ids = [];
  // var that = this;
}

Memory.prototype.serves = function(id) {
  return this.ids.indexOf(id) > -1;
};

Memory.prototype.add = function(id) {
  if (this.ids.indexOf(id) === -1)
    return this.ids.push(id);
  return -1;
};

Memory.prototype.remove = function(id) {
  var index = this.ids.indexOf(id);
  if (index > -1)
    return this.ids.splice(index, 1);
};

Memory.prototype.getAll = function() {
  return this.ids;
};

Memory.prototype.size = function() {
  return this.ids.length;
};

Memory.prototype.set = function(mem) {
  this.ids = mem;
};



// Memory.prototype.load = db.loadIntoMemery(function(res, thenDo) {
//     this.ids = res.map(function(id) {
//       return id["ID"];
//     });
//     thenDo();
//   });
//

Memory.prototype.load = db.loadIntoMemery(function(res, that, thenDo) {
    that.memory.ids = res.map(function(id) {
      return id["ID"];
    });
    thenDo();
  });


exports.Memory = Memory;

// exports.serves = serves;
// exports.add = add;
// exports.remove = remove;
// exports.getAll = getAll;
// exports.size = size;
//
//
//

