const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models")

// routers
const postRouter = require('./routes/posts');
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () =>  { // anonymous function that runs whenever server starts
        console.log("Server running on port 3001");
    });
});
