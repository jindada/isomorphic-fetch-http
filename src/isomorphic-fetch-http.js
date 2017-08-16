import fetch from 'isomorphic-fetch';
import { stringify } from 'qs';


const http = Symbol('http');
const defaultHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
  "Access-Control-Allow-Headers": "token, host, x-real-ip, x-forwarded-ip, accept, content-type",
};
/*
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {object} headers    The request headers
 * @return {object}           An object containing either "data" or "err"
 */
class _http {
  constructor() {
    // bind this
    this.prefix = "";
    this.headers = {};
    this.filter = _ => new Promise(resolve => resolve(_));
    this.callback = _ => _;
    this.cookies = true;
    this.option = {};
  }

  [http](url, option = {}, headers = {}) {
    // url
    const _url = `${this.prefix}${url}`;
    // request headers
    const _headers = { ...defaultHeaders, ...this.headers, ...headers };
    // fetch option
    const _option = {
      ...this.option,
      credentials: this.cookies ? "include" : undefined,
      ...option,
    };
    
    return this.filter({url: _url, headers: _headers, option: _option})
      .then(({url: u, headers: h, option: o}) => fetch(u, {...o, headers: h}))
      .then((resp) => {
        if (resp.status >= 400) {
          throw new Error('400+Error');
        }
        return resp;
      })
      .then((resp) => {
        try {
          return resp.json();
        } catch (e) {
          throw new Error('JSONError');
        }
      })
      .then(this.callback)
      .catch(msg => {
        throw new Error(msg);
      });
  }

  setup({
      prefix = "",
      headers = this.headers,
      filter = this.filter,
      callback = this.callback,
      cookies = this.cookies,
      ...option
    }) {
    this.prefix = prefix;
    this.headers = headers;
    this.filter = filter;
    this.callback = callback;
    this.cookies = cookies;
    this.option = option;
  }

  setHeaders(headers = {}) {
    this.headers = {...this.headers, ...headers};
  }

  get(url, param, headers = {}) {
    return this[http](`${url}?${stringify(param)}`, {}, headers);
  }

  post(url, param, headers = {}) {
    return this[http](url, {method: 'POST', body: stringify(param)}, headers);
  }

  put(url, param, headers = {}) {
    return this[http](url, {method: 'PUT', body: stringify(param)}, headers);
  }

  delete(url, param, headers = {}) {
    return this[http](`${url}?${stringify(param)}`, {method: 'DELETE'}, headers);
  }

  options(url, param, headers = {}) {
    return this[http](url, {method: 'OPTIONS'}, headers);
  }

  json(url, param = {}, headers) {
    return this[http](url, {method: 'POST', body: JSON.stringify(param)}, {...headers, "Content-Type": "application/json"});
  }
}

export default new _http();