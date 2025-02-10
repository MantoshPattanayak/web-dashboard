const express = require('express')
const app = express();
const path = require('path')
const cors = require("cors");

require('dotenv').config({path: path.resolve(__dirname, '../.env') })
let port = process.env.PORT || 8001;


let api_version = process.env.API_VERSION;
let logger = require('./logger/logger')
logger = logger();
require('./models')
const statusCode = require("./utils/statusCode");

const roleroute = require("./routes/api/" +
    api_version +
    "/activity/view.js");

    
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));

// here in the express.urlencoded i.e. extended is equal to true means inside object we can give another object
app.use(
    express.urlencoded({
      extended: true,
      limit: "20mb",
    })
  );
  

app.use("/api/role", roleroute);


logger.info(`server is listening on port ${port}`);
logger.warn(`server is listening onport ${port}`);
logger.error(`server is listening on port ${port}`);
logger.debug(`server is listening on port ${port}`);
logger.silly(`server is listening on port ${port}`);


app.listen(port, (err) =>{
    if(err) throw err;
    console.log(`server is listening on port ${port}`)
})