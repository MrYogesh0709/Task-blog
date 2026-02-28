const app = require("./app");
const { PORT } = require("./config/env.config");
const connectDB = require("./config/connect.config");

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`server is running on PORT:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
