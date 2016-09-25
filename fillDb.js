
var db = require ('./db');

var data = {
  A: ["ID5", "ID64", "ID53", "ID888"],
  B: ["ID1", "ID3", "ID54", "ID887"],
  C: ["ID2", "ID23", "ID14", "ID873"],
  UNTAKEN: ["ID4", "ID44"]
};

// db.dropAllIds();
fill(data);

function fill(data) {
  for (var server in data) {
    data[server].forEach(function(id) {
      if (server != "UNTAKEN") {
        db.saveId(id, "Server " + server);
      } else {
        db.saveId(id, server);
      }
      // console.log("Added", id);
    });
  }
}

setTimeout(function() {
  db.closeDb();
}, 3000);    

exports.fill = fill;
exports.data = data;

