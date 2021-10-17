'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDI = undefined;

var _awilix = require('awilix');

// CREATE DEPENDENCIES Object: db,models,services:

var initDI = exports.initDI = function initDI(_ref, mediator) {
  var serverSettings = _ref.serverSettings,
      dbSettings = _ref.dbSettings,
      database = _ref.database;


  mediator.once('init', function () {
    // create dependencies Container object:
    mediator.on('db.ready', function (db) {
      var container = (0, _awilix.createContainer)();

      container.register({
        database: (0, _awilix.asValue)(db),
        serverSettings: (0, _awilix.asValue)(serverSettings)
      });

      mediator.emit('di.ready', container);
    });

    // DB error handling:
    mediator.on('db.error', function (err) {
      console.log('DB not ready: ', err);
      mediator.emit('di.error');
    });

    // CONNECT MYSQL DB:
    database.connect(dbSettings, mediator);

    // Initiate reboot -> DB createsPool:
    mediator.emit('boot.ready');
  });
};
//# sourceMappingURL=di.js.map