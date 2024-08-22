const express = require("express")
const router = express.Router()


// fetch controller 

const {localFileUpload, imageUpload, videoUpload} = require("../controller/fileUpload")


// mount karna hai req ko

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);


module.exports = router;