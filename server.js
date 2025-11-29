import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

//server call here
connectDB();

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes (import instead of require)
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", taskRoutes);


// console.log(process.env.JWT_SECRET)
// Health Check Route
app.get("/", (req, res) => {
  res.send({ status: "TaskFlow API running" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
