"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uRole = exports.tokenValidator = exports.promiseWraper = exports.handleRes = exports.handleErr = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Test and Decode Authorization token
var tokenValidator = function tokenValidator(req, res, next) {
  var token = req.get('Authorization');

  var _req$container$resolv = req.container.resolve('serverSettings'),
      secret = _req$container$resolv.authTokenSecret;

  if (!token) {
    return next(new Error('Missin\' token...'));
  } else {
    try {
      var decode = _jsonwebtoken["default"].verify(token, secret, function (err, decoded) {
        if (err) {
          console.log(err);
          return next(new Error('Unauthorized request...'));
        } else {
          req.decoded = decoded;
          return next();
        }
      });
    } catch (e) {
      next(e);
    }
  }
};

exports.tokenValidator = tokenValidator;

var handleErr = function handleErr(res) {
  var err = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  res.status(err.status || 500).json({
    errors: {
      global: err.message
    }
  });
};

exports.handleErr = handleErr;

var handleRes = function handleRes(res, data) {
  res.status(200).json(data);
};

exports.handleRes = handleRes;

var promiseWraper = function promiseWraper() {
  return function (req, res, next) {
    console.log('Promise Wrapper!');

    res.promise = function (p) {
      var solve;

      if (p.then && p["catch"]) {
        console.log('Middleware fire a Promise');
        solve = p;
      } else if (p === 'function') {
        console.log('Middlware fire a function');
        solve = Promise.resolve().then(function () {
          return p();
        });
      } else {
        solve = Promise.resolve(p);
      }

      return solve.then(function (data) {
        return handleRes(res, data);
      })["catch"](function (err) {
        return handleErr(res, err);
      });
    };

    return next();
  };
}; // Assign role to user:


exports.promiseWraper = promiseWraper;

var uRole = function uRole(req, res, next) {
  var email = req.body.credentials.email;

  switch (email) {
    case email.match(/^tester./).input:
      req.role = 64;
      break;

    case email.match(/^baker./).input:
      req.role = 8;
      break;

    default:
      req.role = 256;
  }

  next();
}; //export default Object.assign({},{tokenValidator})


exports.uRole = uRole;
//# sourceMappingURL=index.js.map