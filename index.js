// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes.js");
const staffRoutes = require("./routes/staffRoutes.js");
dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://cura-link.vercel.app", // Deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Base route
app.get("/", (req, res) => res.send("✅ API is running..."));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);

// ✅ Listen locally
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

// ✅ Export for Vercel
module.exports = app;
