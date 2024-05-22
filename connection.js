const mongoose = require("mongoose");

const connectMongoDB = async (URL) => {
    return mongoose.connect(URL);
}

module.exports = connectMongoDB;