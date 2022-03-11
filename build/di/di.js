"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _awilix = require("awilix");

// CREATE DEPENDENCIES Object: db,models,services:
var _default = function _default(_ref, mediator) {
  var serverSettings = _ref.serverSettings,
      dbSettings = _ref.dbSettings,
      database = _ref.database,
      models = _ref.models;
  mediator.once('init', function () {
    // create dependencies Container object:
    mediator.on('db.ready', function (db) {
      var container = (0, _awilix.createContainer)();
      container.register({
        database: (0, _awilix.asValue)(db),
        serverSettings: (0, _awilix.asValue)(serverSettings),
        // add models and data validation: joi library
        validate: (0, _awilix.asValue)(models.validate),
        user: (0, _awilix.asValue)(models.user)
      });
      mediator.emit('di.ready', container);
    }); // DB error handling:

    mediator.on('db.error', function (err) {
      mediator.emit('di.error');
    }); // CONNECT MYSQL DB:

    database.connect(dbSettings, mediator); // Initiate reboot -> DB createsPool:

    mediator.emit('boot.ready');
  });
};

exports["default"] = _default;
//# sourceMappingURL=di.js.map