const app = require("./index.js");
const connectDB = require("./config/db.js");

const port = 5000;
async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
