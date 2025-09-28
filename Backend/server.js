const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const {mongoUrl} = require('./keys')
const authRoutes = require('./routes/auth')
// const authRoutes = require("./routes/auth");

require('./models/User')
mongoose.connect(mongoUrl)
mongoose.connection.on('connected',()=>{
    console.log("yeah")
})

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
