// This is used to direct the traffic between many servers or services
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

let port = process.env.PORT || 8000;
console.log(__dirname)
require('dotenv').config({path: path.resolve(__dirname, '../.env') })
const proxy = require('express-http-proxy')
console.log(process.env.BASE_URL_2)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// Use express.json() to parse incoming JSON payloads
app.use(express.json());

// Use express.urlencoded() if you're sending form data
app.use(express.urlencoded({ extended: true }));

// app.use('/create', proxy("http://localhost:8002"))

app.use('/api/role/create', (req, res, next) => {
    console.log('Incoming request to /api/role/create', req.method, req.url);
    console.log('Request Body:', req.body); // Log request body
  
    next(); // Proceed to the next middleware (proxy)
  }, proxy(`${process.env.BASE_URL_2}`, {
    // This option rewrites the path to include the original request path
    proxyReqPathResolver: (req) => {
      return '/api/role/create'; // Ensure the path is correct
    }
  })); 

  app.use('/api/role/viewRole', (req, res, next) => {
    console.log('Incoming request to /api/role/viewRole', req.method, req.url);
    console.log('Request Body:', req.body); // Log request body
  
    next(); // Proceed to the next middleware (proxy)
  }, proxy(`${process.env.BASE_URL_1}`, {
    // This option rewrites the path to include the original request path
    proxyReqPathResolver: (req) => {
      return '/api/role/viewRole'; // Ensure the path is correct
    }
  })); 
app.listen(port ,(err)=>{
    if(err) throw err;
    console.log(`listening on ${port}`);
})