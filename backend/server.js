const express = require("express");
const cors = require("cors");
const connectDB = require("./mongodb");
const todoRoute = require("./routes/todoRoute");
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
require("dotenv").config({ path: "./config.env" });
connectDB();
app.use("/api", todoRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
