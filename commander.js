
// The users inputs can be one of the following commands:
// 1. add, ID ­ asks the server to add a new ID to the central database
// 2. del, ID ­ asks the server to delete the specified ID and all its sub_IDs
// 3. add_sub, sub_ID, ID ­ asks the server to add a sub_ID under an existing ID
// 4. del_sub, sub_ID, ID ­ asks the server to delete a particular sub_ID under an ID

var db = require ('./db');


var add = "add",
  del = "del",
  addSub = "add_sub",
  delSub = "del_sub";

var command = input[0];

if (command == add) {
  var id = input[1];
  add(id);
} else if (command == del) {
  var id = input[1];
  del(id);
} else if (command == addSub) {
  var subId = input[1];
  var id = input[2];
  addSub(subId, id);
} else if (command == delSub) {
  var subId = input[1];
  var id = input[2];
  delSub(subId, id);
}

function add(id, server) {
  db.addOneId(id, server);
}

function del(id) {
  db.removeId(id);
}

function addSub(subId, id) {
  db.saveSubId(id, subId);
}

function del_sub(subId, id) {
  db.removeSubId(id, subId);
}

exports.add = add;

exports.del = del;

exports.addSub = addSub;

exports.delSub = delSub;
