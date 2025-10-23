// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Base route
app.get("/", (req, res) => res.send("✅ API is running..."));

// Routes
app.use("/api/auth", authRoutes);

// Listen locally
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

// Export for Vercel
module.exports = app;
