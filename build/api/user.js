"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../server/middleware/index.js");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(_ref, app) {
  var repo = _ref.repo;
  var jwtOptions = {
    expiresIn: '240d'
  }; // USER routes:
  // Email Confirmation:

  app.get('/user/email/:token', function (req, res) {
    var token = req.params.token; // Check token
    // Response => token
  }); // Get User:

  app.get('/user', _index.tokenValidator, function (req, res) {
    // Call DB:
    var _req$decoded = req.decoded,
        email = _req$decoded.email,
        uid = _req$decoded.uid;
    res.promise(repo.fetchOne('*', 'user', {
      uid: uid
    }).then(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
          data = _ref3[0];

      if (!data) return Promise.reject(new Error('No data...'));
      var role = data.role,
          username = data.username,
          userlast = data.userlast,
          bday = data.bday,
          gender = data.gender,
          language = data.language,
          credit = data.credit,
          rating = data.rating,
          fb_id = data.fb_id,
          crowdfund_id = data.crowdfund_id,
          verified = data.verified;
      return Object.assign({}, {
        role: role,
        username: username,
        userlast: userlast,
        bday: bday,
        gender: gender,
        language: language,
        credit: credit,
        rating: rating,
        fb_id: fb_id,
        crowdfund_id: crowdfund_id,
        verified: verified
      });
    }));
  }); // Check User:

  app.get('/check/:email', function (req, res) {
    // Call DB:
    var email = req.params.email;
    res.promise(repo.fetchOne(['username'], 'user', {
      email: email
    }).then(function (results) {
      if (results.length) {
        var _results = _slicedToArray(results, 1),
            data = _results[0];

        return Object.assign({}, {
          username: data.username
        }, {
          checked: true,
          free: false,
          message: 'This email is in use. Have a Password?'
        });
      }

      return {
        checked: true,
        free: true,
        message: 'Email is free for use. Insert a Password, please!'
      };
    }));
  });
  /* === Handle User Signup, Auth, Login ============================== */
  // MAKE a USER
  // SignUp => Auth-token:

  app.post('/user/auth', _index.uRole, function (req, res) {
    var _req$body$credentials = req.body.credentials,
        email = _req$body$credentials.email,
        password = _req$body$credentials.password;
    var role = req.role;
    var user = Object.assign({}, {
      email: email,
      password: password,
      role: role
    });
    console.log(user); // Validate user data:

    var validate = req.container.cradle.validate;
    validate(user, 'user') // Make a hash:
    .then(function (user) {
      return _bcrypt["default"].hash(password, 10);
    }).then(function (hash) {
      return repo.insertOne('user', _objectSpread(_objectSpread({}, user), {}, {
        password: hash
      }));
    }).then(function () {
      return res.promise(repo.fetchOne('*', 'user', {
        email: email
      }).then(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 1),
            data = _ref5[0];

        if (!data) return Promise.reject(new Error('Apologies: DB lost that User :('));

        var _req$container$resolv = req.container.resolve('serverSettings'),
            SECRET = _req$container$resolv.authTokenSecret;

        var uid = data.uid,
            email = data.email,
            role = data.role;
        return _jsonwebtoken["default"].sign({
          email: email,
          uid: uid,
          role: role
        }, SECRET, jwtOptions, function (err, token) {
          return _objectSpread(_objectSpread({}, data), {}, {
            auth: token,
            new_user: false
          });
        });
      }));
    }); // Error Handling:
    //.catch( error => {
    //  Promise.reject(createError(500))
    //})
  }); // OLD USER : NO AUTH-TOKEN
  // Full Login: Check credentials => auth-token

  app.post('/user/login', function (req, res) {
    var _req$body$credentials2 = req.body.credentials,
        email = _req$body$credentials2.email,
        password = _req$body$credentials2.password; // Login: Check user exist => {user: auth.token, data: user.data}

    res.promise(repo.fetchOne('*', 'user', {
      email: email
    }).then(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 1),
          data = _ref7[0];

      if (!data) return Promise.reject(new Error('No user found!'));
      var hash = data.password;
      return _bcrypt["default"].compare(password, hash).then(function (result) {
        if (!data || !result) return Promise.reject(new Error('Wrong Credentials!'));

        var _req$container$resolv2 = req.container.resolve('serverSettings'),
            SECRET = _req$container$resolv2.authTokenSecret;

        var uid = data.uid,
            email = data.email,
            role = data.role;

        var token = _jsonwebtoken["default"].sign({
          email: email,
          uid: uid,
          role: role
        }, SECRET, jwtOptions);

        return _objectSpread(_objectSpread({}, data), {}, {
          auth: token,
          new_user: false
        });
      });
    })); // Call DB:
    //repo.createUser()
    // HTTP response:
  });
};
/*
email: 'mundrov@mail.com',
  password: '$2b$10$ML6xPfqvLqH9rvOEX3X0gOrMfdyhOMnn3kYaaWfyVj0yAJM7vhPRe',
  role: 256,
  token: null,
  uid: 4,
  verified: 0,
  status: 1,
  username: null,
  userlast: null,
  bday: null,
  gender: null,
  language: null,
  created_at: 2022-02-25T12:41:26.000Z,
  lastlog: 2022-02-25T12:41:26.000Z,
  credit: 10,
  rating: null,
*/


exports["default"] = _default;
//# sourceMappingURL=user.js.map