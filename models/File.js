const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config();

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

// Post-save middleware to send an email after the document is saved
FileSchema.post("save", async function (doc) {
    try {
        console.log("DOC", doc);

        // Transporter configuration
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587, // or 465 if you're using SSL
            secure: false, // use TLS
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Prepare email HTML with dynamic content
        let htmlContent = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <div style="background-color: #4CAF50; padding: 20px; border-radius: 5px; text-align: center;">
                    <h1 style="color: #fff;">🎉 File Uploaded Successfully! 🎉</h1>
                </div>
                <div style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; margin-top: 20px;">
                    <h2 style="color: #4CAF50;">Hello Jee,</h2>
                    <p style="font-size: 16px;">
                        We're excited to inform you that your file has been successfully uploaded to Cloudinary.
                    </p>
                    <p style="font-size: 16px;">
                        <strong>File Name:</strong> ${doc.name} <br>
                        <strong>Uploaded On:</strong> ${new Date().toLocaleDateString()}
                    </p>
                    <p style="font-size: 16px;">
                        You can now access and manage your file through our platform. Thank you for using our service!
                    </p>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="${doc.imageUrl}" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View File</a>
                </div>
                <div style="margin-top: 40px; font-size: 14px; color: #777; text-align: center;">
                    <p>This is an automated email, please do not reply.</p>
                    <p>&copy; 2024 CodeHelp. All rights reserved.</p>
                </div>
            </div>
        `;

        // Send email
        let info = await transporter.sendMail({
            from: `"CodeHelp" <${process.env.MAIL_USER}>`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: htmlContent
        });

        console.log("INFO", info);
    } catch (error) {
        console.log("Error sending email: ", error);
    }
});

// Export the model
module.exports = mongoose.model("FileModel", FileSchema);
