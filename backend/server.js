const app = require("./app");
const PORT = process.env.PORT || 4500;

const dbConnection = require("./config/database");
dbConnection();

process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});

// Start the server:
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
