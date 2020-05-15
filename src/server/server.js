const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const routes = require('./routes.js');

const server = express();
const port = 4000;
const devPort = 4000;

// /* use session */
// server.use(session({
//     secret: 'CodeLab1$1$234',
//     resave: false,
//     saveUninitialized: true
// }));

server.use(bodyParser.urlencoded({extended: false})); //post방식 사용하기 위해
server.use(bodyParser.json());

// server.use(routes); //route 적용하기
// server.use((req, res, next) => {
//     res.status(404).sendFile(index);
// })

console.log(process.env.NODE_ENV);
console.log(__dirname);
//dev server
if (process.env.NODE_ENV.trim() == 'development') {
    server.listen(devPort, () => {
        console.log(`#### webpack-dev-server is listening on port ${devPort}. ${new Date().toLocaleString()} ####`);
    });
}

// //production server
// //html file
// const index = path.resolve(__dirname, 'dist/index.html');

// server.get('*', (req, res) => {
//     res.sendFile(index);
// })

// server.listen(port, () => {
//     console.log(`#### Express listening on port ${port}. ${new Date().toLocaleString()}`);
// });