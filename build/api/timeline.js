"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(_ref, app) {
  var repo = _ref.repo;
  // TIMELINE routes:
  app.get('/tmln/list/', function (req, res) {
    return res.status(200).send('Show List of Timelines');
  }); // single timeline:

  app.get('/tmln/line/:id', function (req, res) {
    return res.status(200).send("Show this Timeline: ".concat(req.params.id));
  });
  app.get('/tmln/line/time/:id', function (req, res) {
    return res.status(200).send("Show Line at: ".concat(req.params.id));
  }); // general route:

  app.get('/tmln/*', function (req, res) {
    return res.status(200).send('Time API\'s here');
  });
};

exports["default"] = _default;
//# sourceMappingURL=timeline.js.map