const mongoose = require("mongoose");

// mongoose.connect(process.env.DATABASE_URL);
// the connection to Mongo DB
mongoose.connect(process.env.MONGODB_URI);

// shortcut variable
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
