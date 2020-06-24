import express from 'express';
import path from 'path';
import routes from './routes';
import db from './db';
import bodyParser from 'body-parser';
import session from 'express-session';
// import { default as connectMongo } from 'connect-mongo';
import helmet from 'helmet';

const server = express();
const devPort = 4000;
const port = 4001;
// const MongoStore = connectMongo(session);

db();
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
}));
server.use(helmet());
server.use(routes); // routes는 sessions에 의존하므로 더 밑에 위치

console.log(process.env.NODE_ENV);
console.log(__dirname);

if (process.env.NODE_ENV.trim() == 'development') {
    server.listen(devPort, () => {
        server.use(express.static('dist'));
        console.log(`#### webpack-dev-server is listening on port ${devPort}. ${new Date().toLocaleString()} ####`);
    });
} else if (process.env.NODE_ENV.trim() == 'production') {
    server.listen(port, () => {
        // server.use('/css', express.static('build/css'));
        server.use(express.static('build'));
        console.log(`#### Express listening on port ${port}. ${new Date().toLocaleString()} ####`);
    });
}