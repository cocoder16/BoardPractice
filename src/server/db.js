const mongoose = require('mongoose');

// mongodb connection
const db = mongoose.connection;
//연결실패
db.on('error', console.error);
//연결성공
db.once('open', () => {
  console.log('#### Connected to mongodb server ####');
})
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
  .then(() => console.log('#### Successfully connected to mongodb ####'))
  .catch(e => console.error(e));