"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _userModel = _interopRequireDefault(require("./user.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//const user = _user(joi)
//console.log('Model user: ',user)
//const schemas = Object.create({user})//NOT WORKING??
var schemas = Object.assign({}, {
  user: (0, _userModel["default"])(_joi["default"])
});

var schemaValidator = function schemaValidator(object, type) {
  return new Promise(function (resolve, reject) {
    if (!object) reject(new Error("Missing schema data to validate"));
    if (!type) reject(new Error("Missing ".concat(type, " data to validate")));

    var _schemas$type$validat = schemas[type].validate(object),
        error = _schemas$type$validat.error,
        value = _schemas$type$validat.value;

    if (error) reject(new Error("Invalid ".concat(type, " data")));
    resolve(value);
  });
}; //export default Object.create({validate: schemaValidator, schemas}) NOT WORKING??


var _default = Object.assign({}, {
  validate: schemaValidator
}, {
  user: (0, _userModel["default"])(_joi["default"])
});

exports["default"] = _default;
//# sourceMappingURL=index.js.map