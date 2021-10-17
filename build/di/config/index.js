"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var serverSettings = exports.serverSettings = {
  port: process.env.SERVER_PORT || 8080,
  ssl: null
};

var dbSettings = exports.dbSettings = {
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  port: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
};
//# sourceMappingURL=index.js.map