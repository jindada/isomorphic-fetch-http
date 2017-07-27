## isomorphic-fetch-http

[![NPM version](https://img.shields.io/npm/v/isomorphic-fetch-http.svg?style=flat)](https://npmjs.org/package/isomorphic-http)
[![NPM downloads](http://img.shields.io/npm/dm/isomorphic-fetch-http.svg?style=flat)](https://npmjs.org/package/isomorphic-http)

## Install

```bash
npm install isomorphic-fetch-http --save
```
## Usage

### Use prebuilt bundle

```javascript
import { http } from 'isomorphic-fetch-http'

// 全局配置
http.setup({
  prefix: '/api',               // url 前缀
  header: {},                   // 自定义请求头
  filter: () => false           // 自定义过滤器 发生在请求执行之前
  callback: data => data        // 数据请求成功之后的回调函数
});

http.setHeader({                // 覆盖/新增 请求头 
  token: ''
})

// get方法 一般用于查询
// @param {Object} param
// @param {Object} header
// @return {Object} {status, data, message}
return http.get('url', param, header);

// post方法 一般用于数据提交
// @param {Object} param
// @param {Object} header
// @return {Object} {status, data, message}
return http.post('url', param, header);

// put方法 一般用于数据修改
// @param {Object} param
// @param {Object} header
// @return {Object} {status, data, message}
return http.put('url', param, header);

// delete方法 一般用于数据删除
// @param {Object} param
// @param {Object} header
// @return {Object} {status, data, message}
return http.delete('url', param, header);

// json方法 本质是请求头为 "Content-Type": "application/json" 的post方法
// @param {Object} param
// @param {Object} header
// @return {Object} {status, data, message}
return http.json('url', param, header);

// options方法 一般用于请求时的预检
// @param {Object} param
// @param {Object} header
// @return {Object} {status, data, message}
return http.options('url', param, header);
```


## Links

- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)


## Contributing

You can submit any ideas as [pull requests](https://github.com/jindada/isomorphic-fetch-http) or as a [Github issue](https://github.com/jindada/isomorphic-fetch-http/issues).
