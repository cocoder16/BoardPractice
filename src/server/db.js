import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default () => {
    function connect() {
        let uri;
        if (process.env.NODE_ENV.trim() == 'development') {
            uri = process.env.DEV_MONGO_URI;
        } else if (process.env.NODE_ENV.trim() == 'production') {
            uri = process.env.MONGO_URI;
        }
        mongoose.connect(uri, {
            useNewUrlParser: true, useUnifiedTopology: true
        }, function(err) {
            if (err) {
                console.error('#### mongodb connection error : ', err);
            }
            console.log('#### mongodb connected ####');
        });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
}

// // mongodb connection
// const db = mongoose.connection;
// //연결실패
// db.on('error', console.error);
// //연결성공
// db.once('open', () => {
//   console.log('#### Connected to mongodb server ####');
// })
// mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
//   .then(() => console.log('#### Successfully connected to mongodb ####'))
//   .catch(e => console.error(e));