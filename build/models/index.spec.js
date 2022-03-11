"use strict";

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Schema Validator', function () {
  test('Must validate User Object', function () {
    var testObject = {
      name: 'Valio',
      password: 'lalala4'
    };
    return expect(_index["default"].validate(testObject, 'user')).rejects.toThrow(/email|password/);
  });
});
//# sourceMappingURL=index.spec.js.map