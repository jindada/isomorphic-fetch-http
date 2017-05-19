import fetch from 'isomorphic-fetch';
import { stringify } from 'qs';

const config = Symbol('config');
const http = Symbol('http');

/*
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {object} header    The request header
 * @return {object}           An object containing either "data" or "err"
 */
class $http {
  contructor() {
    // bind this
    this.prefix = "";
    this.header = {};
    this.fn = (data) => data;    
    this.$get = this.$get.bind(this);
    this.$post = this.$post.bind(this);
    this.$put = this.$put.bind(this);
    this.$delete = this.$delete.bind(this);
    this.$option = this.$option.bind(this);
    this[config] = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Max-Age": "86400",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
        "Access-Control-Allow-Headers": "token, host, x-real-ip, x-forwarded-ip, accept, content-type",
      },
      credentials: "include",
      client_max_body_size: "2048m"
    };
  }

  [http](url, option = {}, header = {}) {
    return fetch(`${this.prefix}${url}`, { ...this[config], headers: { ...this[config].headers, ...this.header, ...header }, ...option })
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
    .then(this.fn)
    .then((data) => data);  
  }

  setup(prefix, header = {}, fn) {
    this.prefix = prefix;
    this.header = header;
    this.fn = fn;
  }

  $get(url, param) {
    return this[http](`${url}?${stringify(param)}`);
  }

  $post(url, param) {
    return this[http](url, { method: 'POST', body: stringify(param) });
  }

  $put(url, param) {
    return this[http](url, { method: 'PUT', body: stringify(param) });
  }

  $delete(url, param) {
    return this[http](`${url}?${stringify(param)}`, { method: 'DELETE' });
  }

  $option(url, param) {
    return $http(url, { method: 'POST', body: JSON.stringify(param) }, {"Content-Type": "application/json"});
  }
}

export default new $http();