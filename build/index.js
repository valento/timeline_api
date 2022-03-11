"use strict";

var _awilix = require("awilix");

var _events = _interopRequireDefault(require("events"));

var _index = _interopRequireDefault(require("./di/index.js"));

var _index2 = _interopRequireDefault(require("./server/index.js"));

var _repository = _interopRequireDefault(require("./repo/repository.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Configure an Event Notifier:
var mediator = new _events["default"](); // Handle Errors:

process.on('uncaughtRejection', function (err, promise) {
  console.error('Unhandled Rejection', err);
}); // Set Event Emmiter:

mediator.on('di.ready', function (container) {
  var rep; // init DB-API:

  _repository["default"].connect(container).then(function (repo) {
    rep = repo; // register DB-API in DI-container:

    container.register({
      repo: (0, _awilix.asValue)(repo)
    }); // Start Server with DI-container

    return _index2["default"].start(container);
  }).then(function (app) {
    app.on('close', function () {
      rep.disconnect(); // or get repo from the container:
      //container.cradle.database.disconnect()
    });
    console.log('Server started on: ', container.cradle.serverSettings.port);
  })["catch"](function (err) {
    return console.error(err);
  });
});
mediator.on('di.error', function (err) {
  console.log('DI failed because of: ', err);
}); // REBOOT Application:

_index["default"].init(mediator);

mediator.emit('init');
//# sourceMappingURL=index.js.map