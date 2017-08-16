'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _qs = require('qs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = Symbol('http');
var defaultHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
  "Access-Control-Allow-Headers": "token, host, x-real-ip, x-forwarded-ip, accept, content-type"
  /*
   * Requests a URL, returning a promise.
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   * @param  {object} headers    The request headers
   * @return {object}           An object containing either "data" or "err"
   */
};
var _http = function () {
  function _http() {
    _classCallCheck(this, _http);

    // bind this
    this.prefix = "";
    this.headers = {};
    this.filter = function (_) {
      return new Promise(function (resolve) {
        return resolve(_);
      });
    };
    this.callback = function (_) {
      return _;
    };
    this.cookies = true;
    this.option = {};
  }

  _createClass(_http, [{
    key: http,
    value: function value(url) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      // url
      var _url = '' + this.prefix + url;
      // request headers
      var _headers = _extends({}, defaultHeaders, this.headers, headers);
      // fetch option
      var _option = _extends({}, this.option, {
        credentials: this.cookies ? "include" : undefined
      }, option);

      return this.filter({ url: _url, headers: _headers, option: _option }).then(function (_ref) {
        var u = _ref.url,
            h = _ref.headers,
            o = _ref.option;
        return (0, _isomorphicFetch2.default)(u, _extends({}, o, { headers: h }));
      }).then(function (resp) {
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
      }).then(this.callback).catch(function (msg) {
        throw new Error(msg);
      });
    }
  }, {
    key: 'setup',
    value: function setup(_ref2) {
      var _ref2$prefix = _ref2.prefix,
          prefix = _ref2$prefix === undefined ? "" : _ref2$prefix,
          _ref2$headers = _ref2.headers,
          headers = _ref2$headers === undefined ? this.headers : _ref2$headers,
          _ref2$filter = _ref2.filter,
          filter = _ref2$filter === undefined ? this.filter : _ref2$filter,
          _ref2$callback = _ref2.callback,
          callback = _ref2$callback === undefined ? this.callback : _ref2$callback,
          _ref2$cookies = _ref2.cookies,
          cookies = _ref2$cookies === undefined ? this.cookies : _ref2$cookies,
          option = _objectWithoutProperties(_ref2, ['prefix', 'headers', 'filter', 'callback', 'cookies']);

      this.prefix = prefix;
      this.headers = headers;
      this.filter = filter;
      this.callback = callback;
      this.cookies = cookies;
      this.option = option;
    }
  }, {
    key: 'setHeaders',
    value: function setHeaders() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.headers = _extends({}, this.headers, headers);
    }
  }, {
    key: 'get',
    value: function get(url, param) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url + '?' + (0, _qs.stringify)(param), {}, headers);
    }
  }, {
    key: 'post',
    value: function post(url, param) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url, { method: 'POST', body: (0, _qs.stringify)(param) }, headers);
    }
  }, {
    key: 'put',
    value: function put(url, param) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url, { method: 'PUT', body: (0, _qs.stringify)(param) }, headers);
    }
  }, {
    key: 'delete',
    value: function _delete(url, param) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url + '?' + (0, _qs.stringify)(param), { method: 'DELETE' }, headers);
    }
  }, {
    key: 'options',
    value: function options(url, param) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this[http](url, { method: 'OPTIONS' }, headers);
    }
  }, {
    key: 'json',
    value: function json(url) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments[2];

      return this[http](url, { method: 'POST', body: JSON.stringify(param) }, _extends({}, headers, { "Content-Type": "application/json" }));
    }
  }]);

  return _http;
}();

exports.default = new _http();