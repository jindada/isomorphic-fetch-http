import fetch from 'isomorphic-fetch';
import { stringify } from 'qs';

const httpConfig = {
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
/*
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const $http = (url, option = {}, header = {}) => {
  return fetch(url, { ...httpConfig, headers: { ...httpConfig.headers, ...header }, ...option })
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
    .then((data) => data);   
};

export default {
  '$get': (url, param = {}, header = {}) => ($http(`${url}?${stringify(param)}`, header)),
  '$post': (url, param = {}, header = {}) => ($http(url, { method: 'POST', body: stringify(param) }, header)),
  '$put': (url, param = {}, header = {}) => ($http(url, { method: 'PUT', body: stringify(param) }, header)),
  '$delete': (url, param = {}, header = {}) => ($http(`${url}?${stringify(param)}`, { method: 'DELETE' }, header)),
  '$option': (url, param = {}, header = {}) => ($http(url, { method: 'POST', body: JSON.stringify(param) }, {...header, ...{ "Content-Type": "application/json" }})),
};