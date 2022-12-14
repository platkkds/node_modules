"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "minimizerPlugin", {
  enumerable: true,
  get: function () {
    return _minimizerPlugin.default;
  }
});
Object.defineProperty(exports, "sourcesPlugin", {
  enumerable: true,
  get: function () {
    return _sourcesPlugin.default;
  }
});

var _sourcesPlugin = _interopRequireDefault(require("./sources-plugin"));

var _minimizerPlugin = _interopRequireDefault(require("./minimizer-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }