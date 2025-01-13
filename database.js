import mongoose from "mongoose";

const mongodbUri =
  "mongodb+srv://saleemraza-admin:EKSP3vBBrbeBc4u2@cluster0.ycnxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(mongodbUri, {
      dbName: "my-todo-db",
    });

    console.log(`\n🌿 MongoDB connected ! 🍃\n`);

    mongoose.connection.on(
      "error",
      console.error.bind(console, "Connection error:")
    );

    process.on("SIGINT", async () => {
      // Cleanup code
      mongoose.connection.close();
      console.log("Mongoose connection closed due to application termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("MONGODB connection FAILED ", error);
    process.exit(1); // Exited with error
  }
};

// (async () => {
try {
  await connectDB();

  // Uncomment the following lines when the server code is added
  // app.listen(PORT, () =>
  //   console.log(`⚙️  Server running at port ==>> ${PORT}`),
  // );
  // app.on("error", (err) => console.log("🚀 ~ main file:", err));
} catch (err) {
  console.log("🚀 ~ main file ~ err:", err);
}
// })();
