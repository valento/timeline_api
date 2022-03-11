"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _mysql = _interopRequireDefault(require("mysql2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connect = function connect(options, mediator) {
  //const mydb = mysql.createPool(options)
  console.log(options);
  mediator.once('boot.ready', function () {
    var mydb = _mysql["default"].createPool(options);

    mydb.on('connection', function () {
      console.log('DB Pool oppened');
    });
    mydb.on('release', function () {
      console.log('DB Pool closed');
    });
    mydb.getConnection(function (err, connection) {
      if (err) {
        mediator.emit('db.error', err);
      } else {
        mediator.emit('db.ready', connection);
      }
    });
  });
};

exports.connect = connect;
//# sourceMappingURL=db.js.map