import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to upload a file from local path
// Function to upload a file from local path
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "exercise_images", // Specify the folder name here
    });

    fs.unlinkSync(localFilePath); // Remove the file from local storage after upload
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Ensure the file is deleted in case of error
    console.error('Error uploading file to Cloudinary:', error);
    return null;
  }
};



const uploadImageByUrl = async (imageUrl) => {
  try {
    if (!imageUrl) return null;

    const response = await cloudinary.uploader.upload(imageUrl, {
      resource_type: "auto",
      folder: "exercise_images", // Specify the folder name here
    });

    return response;
  } catch (error) {
    console.error('Error uploading image from URL:', error);
    return null;
  }
};


export { uploadOnCloudinary, uploadImageByUrl };
