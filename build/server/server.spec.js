"use strict";

var _should = _interopRequireDefault(require("should"));

var _index = _interopRequireDefault(require("./index.js"));

var _awilix = require("awilix");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Server reboot', function () {
  // test serverSettings:
  // with should:
  //it('container.resolve must be a function to start', () => {
  //  return server.start({}).should.be.rejectedWith(Error)
  //})
  // with jest:
  test('Without Dependency Container must exit with error', function () {
    return expect(_index["default"].start({})).rejects.toThrow(/CONTAINER/);
  });
  test('Missing Repo/Port must exit with error', function () {
    return expect(_index["default"].start((0, _awilix.createContainer)({}))).rejects.toThrow(/(serverSettings|repo|REPO|PORT)/);
  });
});
//# sourceMappingURL=server.spec.js.map