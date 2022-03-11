"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var repository = function repository(container) {
  var db = container.cradle.database;
  var query, conditions, inserts; // Construct query:

  var queryPlaceholders = function queryPlaceholders(params) {
    var _placeholders = params.map(function (i) {
      return '?';
    });

    return _placeholders;
  };

  var queryConditions = function queryConditions() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _condition = Object.keys(params).map(function (p) {
      return "".concat(p, "=?");
    });

    return _condition;
  };

  var valuesArray = function valuesArray() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var values = Object.keys(params).map(function (p) {
      return "".concat(p, "=?");
    });
    return _condition;
  }; // Expose Object with Controlers:


  return {
    // SELECT [*] FROM [table] WHERE [condition1 {AND} condition2];
    // SELECT one,two FROM [table] WHERE a=b AND c=d;
    fetchOne: function fetchOne() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
      var table = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // Exit if not table provided:
      if (!table.length) return Promise.reject(new Error('Missing DB-table...')); // Format conditions:

      if (Object.keys(params).length || Object.keys(params).length > 1) {
        conditions = ' WHERE '.concat(queryConditions(params).join(' AND '));
      } else {
        conditions = Object.keys(params).length ? ' WHERE '.concat("".concat(Object.keys(params)[0], "=?")) : '';
      }

      query = "SELECT ".concat(scope, " FROM ").concat(table).concat(conditions, ";");
      console.log(query);
      return new Promise(function (resolve, reject) {
        db.query(query, Object.values(params), function (err, result) {
          if (err) reject(new Error("DB error: ".concat(err)));
          resolve(result);
        });
      });
    },
    getCollection: function getCollection() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
      var table = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // Exit if not table provided:
      if (!table.length) return;
      query = "SELECT ".concat(scope, " FROM ").concat(table, " WHERE ").concat(typeof condition !== 'string' ? condition.join(' AND ') : condition);
      return new Promise(function (resolve, reject) {
        db.query(table, function (err, results) {
          if (err) reject(err);
          resolve(result);
        });
      });
    },
    insertOne: function insertOne() {
      var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      console.log('DB API input: ', data); // Exit if not table provided:

      if (!table.length || !Object.keys(data).length) return;
      var input = new Array(Object.keys(data).length).fill('?');
      query = "INSERT INTO ".concat(table, " (").concat(Object.keys(data), ") VALUES (").concat(input, ")");
      console.log(query);
      return new Promise(function (resolve, reject) {
        db.query(query, Object.values(data), function (err, result) {
          if (err) reject(new Error("DB Error: ,".concat(err)));
          resolve();
        });
      });
    },
    disconnect: function disconnect() {
      db.release();
    }
  };
};

var connect = function connect(container) {
  return new Promise(function (resolve, reject) {
    resolve(repository(container));
  });
};

var _default = Object.assign({}, {
  connect: connect
});

exports["default"] = _default;
//# sourceMappingURL=repository.js.map