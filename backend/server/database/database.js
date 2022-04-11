const mongoose = require('mongoose');
const config = require('../../config')

const Connect = async () => {
    try {
        const con = await mongoose.connect(config.MONGO_URL, {
           useUnifiedTopology: true,
        })
        console.log(`MongoDB connected successfully`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports=Connect;
