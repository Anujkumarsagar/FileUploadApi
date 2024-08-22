const mongoose = require("mongoose");
require("dotenv").config()

// Connect to MongoDB
exports.connect = async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //   useCreateIndex: true,
  }).then(console.log("DB connection successful")).catch((error) => {
    console.log("error while conneected DB ", error)
    process.exit(1);
  })
}