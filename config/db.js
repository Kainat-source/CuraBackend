import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 🧠 Avoid multiple connections during nodemon restarts
    if (mongoose.connection.readyState >= 1) {
      console.log("⚡ MongoDB already connected");
      return;
    }

    // 🌍 Your MongoDB Atlas connection string
    const MONGO_URI =
      "mongodb+srv://kainatn526_db_user:o5xbS2ekMTyJrS59@curalink.gmnvuke.mongodb.net/?retryWrites=true&w=majority&appName=Curalink";

    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host} 🚀`);
  } catch (err) {
    console.error(`❌ DB connection error: ${err.message}`);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
