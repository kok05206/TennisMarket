// let http = require('http');
// let url = require('url');

// function start(route, handle) {
//   function onRequest(request, response) {
//     if (!request.url.includes('favicon.ico')) {
//       let pathname = url.parse(request.url).pathname;
//       let queryData = url.parse(request.url, true).query;

//       route(pathname, handle, response, queryData.productId);
//     }
//   }
//   http.createServer(onRequest).listen(8888);
//   // localhost:8888
// }

// // 외부에서도 끌어서 사용이 가능.
// exports.start = start;

let http = require('http');
// let url = require('url'); // URL class is a global reference for require('url').URL

function start(route, handle) {
  function onRequest(request, response) {
    // let pathname = url.parse(request.url).pathname; //url.parse is deprecated.
    let pathname = new URL(request.url, `http://${request.headers.host}`)
      .pathname;
    // let queryData = url.parse(request.url, true).query; //url.parse is deprecated.
    let queryData = new URL(request.url, `http://${request.headers.host}`)
      .searchParams;
    if (!request.url.includes('favicon.ico')) {
      // route(pathname, handle, response, queryData.productId);
      route(pathname, handle, response, queryData.get('productId'));
    }
  }

  http.createServer(onRequest).listen(8888); // localhost:8888
}

exports.start = start;
