const mongoose = require("mongoose");

// DB Connection setup
function dbConnection() {
  try {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log("connected with data Base");
      })
      .catch((err) => {
        console.log("Not coonected with database" + err);
      });
  } catch (err) {
    console.log(err);
  }
}

module.exports = dbConnection;
