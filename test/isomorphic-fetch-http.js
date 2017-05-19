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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = Symbol('config');
var http = Symbol('http');

/*
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {object} header    The request header
 * @return {object}           An object containing either "data" or "err"
 */

var $http = function () {
  function $http() {
    _classCallCheck(this, $http);

    // bind this
    this.prefix = "";
    this.header = {};
    this.fn = function (data) {
      return data;
    };
    // this.$get = this.$get.bind(this);
    // this.$post = this.$post.bind(this);
    // this.$put = this.$put.bind(this);
    // this.$delete = this.$delete.bind(this);
    // this.$option = this.$option.bind(this);
    this[config] = {
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

    console.log(this);
  }

  _createClass($http, [{
    key: http,
    value: function value(url) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return (0, _isomorphicFetch2.default)('' + this.prefix + url, _extends({}, this[config], { headers: _extends({}, this[config].headers, this.header, header) }, option)).then(function (resp) {
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
      }).then(this.fn).then(function (data) {
        return data;
      });
    }
  }, {
    key: 'setup',
    value: function setup(_ref) {
      var prefix = _ref.prefix,
          _ref$header = _ref.header,
          header = _ref$header === undefined ? {} : _ref$header,
          fn = _ref.fn;

      this.prefix = prefix;
      this.header = header;
      this.fn = fn;
    }
  }, {
    key: 'get',
    value: function get(url, param) {
      return this[http](url + '?' + (0, _qs.stringify)(param));
    }
  }, {
    key: 'post',
    value: function post(url, param) {
      return this[http](url, { method: 'POST', body: (0, _qs.stringify)(param) });
    }
  }, {
    key: 'put',
    value: function put(url, param) {
      return this[http](url, { method: 'PUT', body: (0, _qs.stringify)(param) });
    }
  }, {
    key: 'delete',
    value: function _delete(url, param) {
      return this[http](url + '?' + (0, _qs.stringify)(param), { method: 'DELETE' });
    }
  }, {
    key: 'option',
    value: function option(url, param) {
      return $http(url, { method: 'POST', body: JSON.stringify(param) }, { "Content-Type": "application/json" });
    }
  }]);

  return $http;
}();

exports.default = new $http();