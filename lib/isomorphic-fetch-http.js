'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$option = exports.$delete = exports.$put = exports.$post = exports.$get = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _qs = require('qs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Max-Age": "86400",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers": "token, host, x-real-ip, x-forwarded-ip, accept, content-type"
  },
  credentials: "include",
  client_max_body_size: "2048m"
};
/*
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
var $http = function $http(url) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return (0, _isomorphicFetch2.default)(url, _extends({}, httpConfig, { headers: _extends({}, httpConfig.headers, header) }, option)).then(function (resp) {
    if (resp.status >= 400) {
      throw new Error('400+Error');
    }
    return resp;
  }).then(function (resp) {
    try {
      return resp.json();
    } catch (e) {
      throw new Error('JSONError');
    }
  }).then(function (data) {
    return data;
  });
};

var $get = exports.$get = function $get(url) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return $http(url + '?' + (0, _qs.stringify)(param), header);
};

var $post = exports.$post = function $post(url) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return $http(url, { method: 'POST', body: (0, _qs.stringify)(param) }, header);
};

var $put = exports.$put = function $put(url) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return $http(url, { method: 'PUT', body: (0, _qs.stringify)(param) }, header);
};

var $delete = exports.$delete = function $delete(url) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return $http(url + '?' + (0, _qs.stringify)(param), { method: 'DELETE' }, header);
};

var $option = exports.$option = function $option(url) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return $http(url, { method: 'POST', body: JSON.stringify(param) }, _extends({}, header, { "Content-Type": "application/json" }));
};