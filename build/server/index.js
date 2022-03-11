"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _index = require("./middleware/index.js");

var _index2 = _interopRequireDefault(require("../api/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var start = function start(container) {
  return new Promise(function (resolve, reject) {
    // Check for DI:
    if (typeof container.resolve !== 'function') {
      reject(new Error('CONTAINER missing ...'));
    }

    var repo = container.resolve('repo');

    var _container$resolve = container.resolve('serverSettings'),
        port = _container$resolve.port;

    if (!repo) {
      reject(new Error('REPO is missing ...'));
    }

    if (!port) {
      reject(new Error('PORT is missing ...'));
    } // ======================================================
    // Express App Server:


    var app = (0, _express["default"])(); //app.use(bodyparser.urlencoded({ extended: true }))

    app.use(_bodyParser["default"].json());
    app.use(_express["default"].urlencoded({
      extended: true
    })); // Parse request body:

    app.use((0, _morgan["default"])('dev'));
    app.use((0, _helmet["default"])());
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

      res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
      next();
    }); // Default error handling:

    app.use((0, _index.promiseWraper)());
    app.use(function (err, req, res, next) {
      res.promise(Promise.reject(err));
    }); // Check user-authentication:
    //app.use(( req,res,next ) => {
    //  // Check User middleware:
    //  next()
    //})
    // Attach Dependencies to requiest:
    // Create Parent Scope for future User-state:

    app.use(function (req, res, next) {
      req.container = container.createScope();
      next();
    }); // Provide API with Repo-Controlers:

    var tmlnAPI = _index2["default"].tmln_api.bind(null, {
      repo: repo
    });

    var usrAPI = _index2["default"].usr_api.bind(null, {
      repo: repo
    }); // Inversion of Control
    // Provide API with Application Server


    usrAPI(app);
    tmlnAPI(app); // Error handling:

    app.use(function (err, req, res, next) {
      //reject(new Error('!Some application error: ',err))
      res.status(500).json({
        error: {
          global: err.message
        }
      });
      next();
    });
    var server = app.listen(port, function () {
      resolve(server);
    });
  });
};

var _default = Object.assign({}, {
  start: start
});

exports["default"] = _default;
//# sourceMappingURL=index.js.map