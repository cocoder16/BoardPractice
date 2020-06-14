import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default () => {
    function connect() {
        mongoose.connect(process.env.MONGO_URI, {
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