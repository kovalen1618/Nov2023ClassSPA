// 'Import' the Express module instead of http
import express from "express";
import dotenv from "dotenv";

// Load Enviroment Variables from .env File
dotenv.config();

// Initialize the Express application
const app = express();

const PORT = process.env.PORT || 4040;

// CORS Middleware - allows any origin to access the server
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

// Logging Middleware - appears in terminal when performing request (date, time)
const logging = (request, response, next) => {
  console.log(
    `${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`
  );
  next();
};

app.use(cors);
// Body-Parsing
app.use(logging);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.status(200).json({ message: "Service healthy" });
});

// Handle the request with HTTP GET method with query parameters and a url parameter
app.get("/weather/:city", (request, response) => {
  // Express adds a "params" Object to requests that has an matches parameter created using the colon syntax
  const city = request.params.city;

  // Set defaults values for the query string parameters
  let cloudy = "clear";
  let rainy = false;
  let lowTemp = 32;
  // check if the request.query.cloudy attribute exists
  if ("cloudy" in request.query) {
    // If so update the variable with the query string value
    cloudy = request.query.cloudy;
  }
  if ("rainy" in request.query && request.query.rainy === "true") {
    rainy = request.query.rainy;
  }
  if ("lowtemp" in request.query) {
    lowTemp = Number(request.query.lowtemp);
  }

  // Generate a random number to use as the temperature
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
  const min = 70;
  const max = 90;
  const temp = Math.floor(Math.random() * (max - min + 1) + min);
  // handle GET request for weather with an route parameter of "city"
  response.json({
    text: `The weather in ${city} is ${temp} degrees today.`,
    cloudy: cloudy,
    // When the key and value variable are named the same you can omit the value variable
    rainy,
    temp: {
      current: temp,
      low: lowTemp
    },
    city
  });
});

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// // 'Import' the http module
// import http from "http";
// // Initialize the http server
// const server = http
//   .createServer((request, response) => {
//     // Handle the request from http://localhost:4040/status with HTTP GET method
//     if (request.url === "/status" && request.method === "GET") {
//       // Create the headers for response
//       response.writeHead(200, { "Content-Type": "application/json" });
//       // Create the response body
//       response.write(JSON.stringify({ message: "Service healthy" }));
//       // End and return the response
//       response.end();
//     }
//   })
//   // Tell the HTTP server to start listening
//   .listen(4040);

// // Let the humans know I am running and listening on 4040
// console.log("Listening on port 4040");