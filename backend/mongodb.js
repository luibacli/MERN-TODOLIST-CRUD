const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = () =>
    mongoose
        .connect(process.env.MONG_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("DB Connected"))
        .catch(console.error);

module.exports = connectDB;
