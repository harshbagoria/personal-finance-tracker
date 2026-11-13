import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import v1Routes from "./Routes/V1/index.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/v1", v1Routes);

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("❌ Server startup failed:", error.message);
  process.exit(1);
});