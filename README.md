
# 📦 File Upload & Notification System

The **File Upload & Notification System** is a robust Node.js application that enables users to upload files, images, and videos to Cloudinary, while automatically sending email notifications upon successful uploads. The application is built with Express.js and MongoDB, and it supports various file types with validation and size checks.

## 🎯 Features

- **Local File Upload**: Upload files locally to a specific directory.
- **Image Upload to Cloudinary**: Supports JPEG, JPG, and PNG formats with automatic Cloudinary upload.
- **Video Upload to Cloudinary**: Supports MP4 and 3GP formats with size validation.
- **Email Notifications**: Automatically sends an email notification after a successful upload.
- **File Type and Size Validation**: Ensures only supported file types and sizes are uploaded.
- **Dynamic File Handling**: Handles different file types (image/video) with dynamic processing.

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Storage**: Cloudinary
- **Email Service**: Nodemailer (Gmail SMTP)
- **Environment Configuration**: dotenv

## 🏗️ Project Structure

```plaintext
📂 project-root
├── 📁 .vscode                # Visual Studio Code configuration files
├── 📁 config
│   ├── cloudinary.js         # Cloudinary configuration
│   └── database.js           # Database connection setup
├── 📁 controller
│   ├── files                 # Directory to handle file-related operations
│   └── fileUpload.js         # Business logic for file, image, and video uploads
├── 📁 models
│   └── File.js               # Mongoose schema for file metadata
├── 📁 routes
│   └── FileUpload.js         # Express routes for file upload handling
├── 📁 temp                   # Temporary directory for handling uploads
├── 📄 .env                   # Environment variables
├── 📄 .gitignore             # Git ignore file
├── 📄 controllerfiles1724075010248  # Temporary file (likely for internal use)
├── 📄 image.png              # Sample image file
├── 📄 index.js               # Main application file
├── 📄 package-lock.json      # Node.js dependency tree
├── 📄 package.json           # Node.js dependencies and scripts
└── 📄 README.md              # Project documentation
```

## ⚙️ Config



1. **Set Up Environment Variables**:
   Create a `.env` file in the root of your project and add the following:

   ```plaintext
   PORT=3000
   DB_URL=mongodb://localhost:27017/fileUpload
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_email_password
   ```



## 🧪 Testing the Application

1. **Local File Upload**:
   - Send a POST request to `/api/v1/upload/localFileUpload` with a file attached.

2. **Image Upload**:
   - Send a POST request to `/api/v1/upload/imageUpload` with the image file, name, tags, and email fields.

3. **Video Upload**:
   - Send a POST request to `/api/v1/upload/videoUpload` with the video file, name, tags, and email fields.

## 📧 Email Notifications

Upon successful upload of an image or video, an email will be sent to the provided email address with details about the uploaded file.


