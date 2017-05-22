import $http from './isomorphic-fetch-http';

$http.setup({
  prefix: '/123',
  header: {"123123": "asda"},
  fn: (data) => data
});

$http.setup({
  prefix: '/123',
  header: {"456456": "3453453"},
  fn: (data) => data
});

$http.get("/asd");


