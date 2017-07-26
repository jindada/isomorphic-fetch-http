import $http from './isomorphic-fetch-http';
$http.setup({
  prefix: '19634',
  header: {},
});

$http.setHeader({
  token: 'asdasd'
});

$http.get("/add?currentPage=1");