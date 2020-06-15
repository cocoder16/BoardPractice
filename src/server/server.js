import express from 'express';
import path from 'path';
import routes from './routes';
import db from './db';
import bodyParser from 'body-parser';
import session from 'express-session';
// import { default as connectMongo } from 'connect-mongo';
import helmet from 'helmet';

const server = express();
const port = 4000;
const devPort = 4000;
// const MongoStore = connectMongo(session);

db();
server.use(express.static('public'));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(session({
    HttpOnly: true,
    secure: true,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 24000 * 60 * 60 },
    // store: new MongoStore({
    //     url: process.env.MONGO_URI,
    //     collection: "sessions"
    // })
}))
server.use(routes); // routes는 sessions에 의존하므로 더 밑에 위치
server.use(helmet());

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