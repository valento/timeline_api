"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverSettings = exports.dbSettings = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config({
  silent: true
});

var serverSettings = {
  port: process.env.SERVER_PORT || 8000,
  ssl: null,
  authTokenSecret: process.env.AUTH_SECRET
};
exports.serverSettings = serverSettings;
var dbSettings = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.NODE_ENV === 'development' ? process.env.DB_DEV_NAME : process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  user: process.env.NODE_ENV === 'development' ? process.env.DB_DEV_USER : process.env.DB_USER,
  password: process.env.NODE_ENV === 'development' ? process.env.DB_DEV_PASS : process.env.DB_PASS
};
exports.dbSettings = dbSettings;
//# sourceMappingURL=index.js.map