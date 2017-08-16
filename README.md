## isomorphic-fetch-http

[![NPM version](https://img.shields.io/npm/v/isomorphic-fetch-http.svg?style=flat)](https://npmjs.org/package/isomorphic-http)
[![NPM downloads](http://img.shields.io/npm/dm/isomorphic-fetch-http.svg?style=flat)](https://npmjs.org/package/isomorphic-http)

## Install

```bash
npm install isomorphic-fetch-http --save
```
## Usage
```javascript
import { http } from 'isomorphic-fetch-http'

http.setup({
  cookies: true,
});

return http.get('url', param, header);
```

## Options

### setup

全局配置

> #### prefix
  请求 url 前缀
  
> #### headers

  配置请求头
  
> #### cookies

  是否携带cookies
  
> #### filter

  过滤函数，发生在请求发出之前，可以对url, headers，fetch option进行更改，类型为 Promise function。
  
  ```javascript
  http.setup({
    filter: data => new Promise((resolve, reject) => {
      // 获取
      const { url, headers, option } = data;
      
      // 修改
      const newHeaders = {
        ...headers,
        token: 'zhnagsan'
      };
      
      // 返回
      resolve({ url, headers: newHeaders, option });
    })
  });
  ```
> #### callback

  回调数据函数，对请求成功获取到的数据进行预处理
  
  ```javascript
  http.setup({
    callback: data => {
      const { status, data, messgae } = data;
      if (status) {
        return data;
      } else {
        throw new Erroe(message);
      }
    }
  ```
### get
  get 方法，一般用于数据查询
  ```javascript
  return http.get('/get', {currentPage: 1}, {token: 'zhangsan'}); // 此处的headers优先级最高
  ```

### post
post 方法，一般用于数据提交
  ```javascript
  return http.post('/add', {username: 'zhangsan'});
  ```

### put
put 方法，一般用于数据修改
  ```javascript
  return http.put('/update/1', {username: 'lisi'});
  ```

### delete
delete 方法，一般用于数据删除
  ```javascript
  return http.put('/delete/1');
  ```

### json
请求头 "Content-Type" 为 "application/json" 的 post 方法
  ```javascript
  return http.post('/add', {username: 'zhangsan'});
  ```

### options
option 方法，一般用于请求时的预检
  

## Links

- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)


## Contributing

You can submit any ideas as [pull requests](https://github.com/jindada/isomorphic-fetch-http) or as a [Github issue](https://github.com/jindada/isomorphic-fetch-http/issues).
