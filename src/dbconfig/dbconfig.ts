import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const dbInstance = mongoose.connection;
    dbInstance.on("connection", () => {
      console.log("Database connected");
    });
    dbInstance.on("error", (err) => {
      console.log("Error while connecting to database: " + err);
      process.exit(1);
    });
  } catch (error) {
    console.error(error, "Database connection failed");
  }
}
