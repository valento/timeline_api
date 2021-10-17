'use strict';

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _di = require('./di');

var _di2 = _interopRequireDefault(_di);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mediator = new _events2.default();
console.log('Emmiter running');
mediator.on('di.ready', function (container) {
  //repository.connect().then( repo => {return server.start(container)})
  _server2.default.start(container);
});

// REBOOT:
_di2.default.init(mediator);

mediator.emit('init');
//# sourceMappingURL=index.js.map