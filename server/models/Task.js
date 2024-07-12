const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
}, { timestamps: true });

module.exports = mongoose.model('Task', userSchema);