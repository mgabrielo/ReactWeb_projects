const mongoose = require('mongoose');
//
mongoose.set('strictQuery', false);
const ConnectDb = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected : ${connect.connection.host}`.cyan.underline.bold);
}

module.exports = ConnectDb;