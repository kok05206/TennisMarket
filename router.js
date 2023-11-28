// function route(pathname, handle, response, productId) {
//   console.log('pathname', pathname);

//   if (typeof handle[pathname] == 'function') {
//     handle[pathname](response, productId);
//   } else {
//     response.writeHead(404, { 'Content-Type': 'text/html' });
//     response.write('Not Found');
//     response.end();
//   }
// }

// exports.route = route;

function route(pathname, handle, response, productId) {
  console.log('pathname :', pathname);
  if (typeof handle[pathname] == 'function') {
    handle[pathname](response, productId);
  } else {
    // 등록된 path가 아닌 경우
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write('<h1>Page Not Found</h1><br><a href="./">Go Home</a>');
    response.end();
  }
}

exports.route = route;
