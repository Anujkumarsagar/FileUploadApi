const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true // Only if you want this field to be mandatory
    },
    tags: { // Changed to "tags" to allow multiple tags
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

// Export the model
module.exports = mongoose.model("FileModel", FileSchema);
