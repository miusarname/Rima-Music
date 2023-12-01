import cloudinary from "cloudinary";
import { Response,Request } from "express";

export async function uploadPhoto(req: Request | any, res: Response): Promise<void> {
  // Get the photo data from the request
  const file = req.files.photo; // Assuming the photo is uploaded as a file named "photo"

  // Configure Cloudinary
  cloudinary.config({ 
    cloud_name: 'dvq3fjinz', 
    api_key: '636613192199762', 
    api_secret: 'NowNpTi_hZmaP7K5BurQvI2ab3I' 
  });

  // Upload the photo to Cloudinary
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      public_id: `photos/${req.body.name}`, // Replace with desired public ID
    });

    // Respond with the uploaded photo information
    res.status(201).json({
      status: 201,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error uploading photo",
    });
  }
}

