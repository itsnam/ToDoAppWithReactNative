const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/mydatabase';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Mongoose Connected');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
