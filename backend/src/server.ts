import app from "./app.js";
import { connectDB } from "./database/connect.js";
import { env } from "./config/env.js";

async function startServer() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

startServer();