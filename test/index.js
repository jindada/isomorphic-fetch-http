import http from './isomorphic-fetch-http';
http.setup({
  prefix: '/19634',
  headers: {
    "clent_max_body_size": "1024m"
  },
  // filter: ({url, headers, option}) => new Promise((resolve) => {
  //   resolve({url, headers: {...headers, token: 'asdasd'}, option});
  // })
});

http.get("/add", {currentPage: 1});