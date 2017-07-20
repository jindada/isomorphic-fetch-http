import $http from './isomorphic-fetch-http';
$http.setup({
  prefix: '19634',
  header: {},
  // filter: {
  //   before: () => {
  //     alert('before');
  //   },
  //   after: (data) => {
  //     alert('after');
  //   }
  // }
});

$http.setHeader({
  token: 'asdasd'
});

$http.get("/add?currentPage=1");