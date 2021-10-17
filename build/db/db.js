'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connect = exports.connect = function connect(options, mediator) {
  //const mydb = mysql.createPool(options)

  mediator.once('boot.ready', function () {

    //mydb.getConnection( (err,connection) => {
    //  if(err) {
    //    mediator.emit('db.error', err)
    //  } else {
    //    mediator.emit('db.ready', connection)
    //  }
    //})
    mediator.emit('db.ready', {});
  });
};
//# sourceMappingURL=db.js.map