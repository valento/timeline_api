'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _di = require('./di');

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = _di.initDI.bind(null, { serverSettings: _config.serverSettings, dbSettings: _config.dbSettings, database: _db2.default });

exports.default = Object.assign({}, { init: init });
//# sourceMappingURL=index.js.map