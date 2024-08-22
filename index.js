const express = require("express");
const DbConnection = require("./config/database")
const app = express();

require("dotenv").config()

const PORT = process.env.PORT || 4000

// Middleware for parsing JSON request bodies
app.use(express.json());

//third party library to intrect with file 
const fileupload = require("express-fileupload");
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "./temp/"
 // createParentPath: true  // if parent folder not exist then it will create it
}))


//cloud se connect karne h

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
DbConnection.connect();


//api route mout karna hai
const Upload = require("./routes/FileUpload")
app.use("/api/v1/upload", Upload);


// Call the database function to establish the connection

app.listen(PORT, (req, res) => {
  console.log("server Started on port ", PORT)
})

//for interting with the file we have to use third party lib