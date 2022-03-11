"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user.js"));

var _timeline = _interopRequireDefault(require("./timeline.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Make an Object of All App Routes:
var _default = Object.assign({}, {
  usr_api: _user["default"]
}, {
  tmln_api: _timeline["default"]
});

exports["default"] = _default;
//# sourceMappingURL=index.js.map