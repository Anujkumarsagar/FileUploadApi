// Bussiness Logic about 
const FileModel = require("../models/File");
// const { options } = require("../routes/FileUpload");
const cloudinary = require("cloudinary").v2
const mongoose = require("mongoose")

// localfileUpload => handler function


exports.localFileUpload = async (req, res) => {
    try {

        //fetch the file

        const file = req.files.file;
        console.log("FILE IS: ", file);

        //path 
        // "."+file.name.split(".")[1] => this for .extension other wi se it gives just name with the time

        const path = __dirname + "/files/" + Date.now() + "." + file.name.split(".")[1];
        console.log("PATH IS: ", path);


        // save the file in the file folder from the route who visit an do post requrest from the client side

        file.mv(path, (error) => {
            console.log("the error is in the mv func")
        })

        // successfull response

        res.json({
            status: true,
            message: "file uploaded successfully",
            file_path: path
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "during the localuploadfile"
        })
    }
}

function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType); // gies true and false
}

async function uploadOnCloudinary(file, folder) {
    // console.log("ente")
    const options = { folder };
    options.resource_type ="auto"
    console.log("temp file path", file.tempFilePath)
    return await cloudinary.uploader.upload(file.tempFilePath, options);

}

//image upload

exports.imageUpload = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email)
        const image = req.files.image;
        console.log(image)

        //validation

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = image.name.split(".")[1];
        console.log(fileType)

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                status: false,
                message: "file type not supported"
            })
        }

        // file formate supported 
        //cloudinary upload karna hai

        console.log("uploading to cloudinary");

        const response = await uploadOnCloudinary(image, "FileUpload")

        console.log(response)

        // const imageUrl = response.secure_url
        // const fileData = await FileModel.create({
        //     name,  tags , email, imageUrl:response.secure_url
        // })

        const fileData = await FileModel.create({
            name, tags, email,
            imageUrl: response.secure_url,
            // fileData,  // for storing in the db if required
        })
        // console.log("the DB entery is ", fileData)

        res.json({
            sucess: true,
            message: "Image uploaded successfully",
            data: fileData
        })
    } catch (error) {

        console.error("error while uplaoding image")

        return res.status(500).json({
            status: false,
            message: "Error while uploading image"
        })
    }
}


exports.videoUpload = async (req, res) => {
    try{
        // fetch

        const { name, tags, email} = req.body;
        console.log(name, tags, email);
        //fetch file 

        const video = req.files.video
        console.log(video)
        // validate with formate and size
        const videoType = video.name.split(".")[1]
        TypeSupportedforvideo = ["mp4", "3gp"]
        console.log(videoType)

        if(!isFileTypeSupported(videoType, TypeSupportedforvideo)){
            return res.status(400).json({
                status: false,
                message: "video type not supported"
            })
        }

        console.log("checking for size")
        //size validate
        if(video.size/1024/1024 > 5){
            return res.json({
                status: false,
                message: "video size too large"
            })
        }
        
        console.log("after checking for size",video.size/1024/1024 > 5)
        //upload at cloudinaary

        const response = await uploadOnCloudinary(video, "videoUpload")
        console.log(response)
        console.log("file i Upload on Cloudinary is :",video)


        
        const fileData = await FileModel.create({
            name, tags, email,
            imageUrl: response.secure_url,
            // fileData,  // for storing in the db if required
        })
        
         return res.json({
            status: true,
            message: "video uploaded successfully",
            data: response
        })
    }catch(error){
        return res.status(500).json({
            status: false,
            message: "Error while uploading video",
            error: error.message
        })
    }
}

// exports.reduceFile = async(r)


// DB - enrty - main bhej do

// 2 middleware hote  hai mongoose mein pre aur post jo fucntion chala dete hi jab enrty create hoti hai ya ussse pahle chala do

// schema.post("init/ validate/ save/ remove", function(req,res)=>{

// })


// nodemailer -> for sending mail