import { Gallery } from "../models/gallerySchema.js";
import { logger } from "../../logger.js";
import multer from "multer";

import { getAllImagesFromGallery, deleteImageFromGallery } from "../service/galleryService.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../server/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});
const upload = multer({ storage: storage }).single('image');

export const uploadImageToGallery=async(req,res)=>{
  try{
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        logger.error('Error uploading image');
        return res.status(400).json({ message: 'Error uploading image' });
      } else if (err) {
        logger.error('Server error uploading image');
        return res.status(500).json({ message: 'Server error uploading image' });
      }

      const { alt, overlayText, category } = req.body;
      const imagePath = req.file.filename;

      const newImage = new Gallery({
        imagePath:imagePath,
        alt,
        overlayText,
        category
      });

      await newImage.save();
      logger.info('Image uploaded successfully');
      res.status(201).json(newImage);
    });
  }catch(error){
    logger.error('Error in uploadImageToGallery controller:', error.message);
    res.status(500).json('Server error');
  }
}

export const getAllImagesController=async(req,res)=>{
  try{
    const allImages=await getAllImagesFromGallery()
    res.status(200).json(allImages)
  }catch(error){
    res.status(500).json({error:'Server Error'})
  }
}

export const deleteImageController= async(req,res)=>{
  try{
    const imageId=req.params.id;
    await deleteImageFromGallery(imageId)
    res.status(200).json({message:'Image is successfully deleted from gallery'})
  }catch(error){
    res.status(500).json('Server error')
  }
}