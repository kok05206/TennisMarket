// const fs = require('fs');

// const main_view = fs.readFileSync('./main.html');
// const orderlist_view = fs.readFileSync('./orderlist.html');

// const mariadb = require('./database/connect/mariadb');

// function main(response) {
//   console.log('main');

//   mariadb.query('SELECT * FROM product', function (err, rows) {
//     console.log(rows);
//   });

//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   response.write(main_view);
//   response.end();
// }

// function redRacket(response) {
//   fs.readFile('./img/redRacket.png', function (err, data) {
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     response.write(data);
//     response.end();
//   });
// }

// function blueRacket(response) {
//   fs.readFile('./img/blueRacket.png', function (err, data) {
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     response.write(data);
//     response.end();
//   });
// }

// function blackRacket(response) {
//   fs.readFile('./img/blackRacket.png', function (err, data) {
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     response.write(data);
//     response.end();
//   });
// }

// function order(response, productId) {
//   response.writeHead(200, { 'Content-Type': 'text/html' });

//   mariadb.query(
//     'INSERT INTO orderlist VALUES (' +
//       productId +
//       ", '" +
//       new Date().toLocaleDateString() +
//       "');",
//     function (err, rows) {
//       console.log(rows);
//     }
//   );

//   response.write('order page');
//   response.end();
// }

// function orderlist(response) {
//   console.log('orderlist');
//   response.writeHead(200, { 'Content-Type': 'text/html' });

//   mariadb.query('SELECT * FROM orderlist', function (err, rows) {
//     response.write(orderlist_view);

//     rows.forEach((element) => {
//       response.write(
//         '<tr>' +
//           '<td>' +
//           element.product_id +
//           '</td>' +
//           '<td>' +
//           element.order_date +
//           '</td>' +
//           '</tr>'
//       );
//     });

//     response.write('</table>');
//     response.end();
//   });
// }

// let handle = {};
// handle['/'] = main;
// handle['/order'] = order;
// handle['/orderlist'] = orderlist;

// /**image directory */
// handle['/img/redRacket.png'] = redRacket;
// handle['/img/blueRacket.png'] = blueRacket;
// handle['/img/blackRacket.png'] = blackRacket;

// exports.handle = handle;

const fs = require('fs'); // file system module
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
  mariadb.query('SELECT * FROM product', function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(main_view);
  response.end();
}

function redRacket(response) {
  fs.readFile('./img/redRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });
}

function blueRacket(response) {
  fs.readFile('./img/blueRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });
}

function blackRacket(response) {
  fs.readFile('./img/blackRacket.png', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });
}

function mainCSS(response) {
  fs.readFile('./main.css', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(data);
    response.end();
  });
}

function order(response, productId) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  mariadb.query(
    `INSERT INTO orderlist VALUES (${productId}, '${new Date().toLocaleDateString(
      'ko-KR',
      options
    )}');`,
    function (err, rows) {
      if (err) {
        console.log(err);
        response.write('<a href="./">Go to MainPage</a>');
        response.end();
      } else {
        console.log(rows);
        response.write('<a href="./">Go to MainPage</a>');
        response.end();
      }
    }
  );
}

function orderlist(response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  const sqlQuery = `
        SELECT orderlist.product_id, product.name, product.description, product.price, orderlist.order_date
        FROM orderlist
        JOIN product ON orderlist.product_id = product.id
        ORDER BY orderlist.order_date;
    `;
  mariadb.query(sqlQuery, function (err, rows) {
    response.write(orderlist_view);
    rows.forEach((element) => {
      response.write(`
                <tr>
                    <td>${element.product_id}</td>
                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td>${element.price}</td>
                    <td>${element.order_date}</td>
                </tr>
            `);
    });
    response.write('</table>');
    response.end();
  });
}

let handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

/* css file */
handle['/main.css'] = mainCSS;

exports.handle = handle;
