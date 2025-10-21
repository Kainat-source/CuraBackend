import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";

dotenv.config();

const app = express();

// Middleware+
app.use(express.json());

// CORS setup
const corsOptions = {
  origin: [
    "http://localhost:5173", // local dev
    "https://your-frontend.vercel.app" // production frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));


// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);

// Vercel expects export default
export default app;
