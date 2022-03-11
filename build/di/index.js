"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("./config/index.js");

var _di = _interopRequireDefault(require("./di.js"));

var _index2 = _interopRequireDefault(require("../db/index.js"));

var _index3 = _interopRequireDefault(require("../models/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var init = _di["default"].bind(null, {
  serverSettings: _index.serverSettings,
  dbSettings: _index.dbSettings,
  database: _index2["default"],
  models: _index3["default"]
});

var _default = Object.assign({}, {
  init: init
});

exports["default"] = _default;
//# sourceMappingURL=index.js.map