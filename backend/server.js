// server is start here
require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/db/db");


app.listen(3000, () => {
  connectDB();
  console.log(`Serevr is running on port: http://localhost:${3000}`);
});
