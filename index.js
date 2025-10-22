const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const staffRoutes = require("./routes/staffRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

// Base route
app.get("/", (req, res) => res.send("✅ API is running..."));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);

// ✅ If running locally, listen on port
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

// ✅ Export for Vercel
module.exports = app;
