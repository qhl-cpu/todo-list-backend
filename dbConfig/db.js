const mongoose = require('mongoose');

const connectDB = async (app) => {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log('connected to mongoDB')
                app.listen(3000, ()=> {
                    console.log("Node API app is running on port 3000")
                })
            })
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
		process.exit(1);
    }
};

module.exports = connectDB;