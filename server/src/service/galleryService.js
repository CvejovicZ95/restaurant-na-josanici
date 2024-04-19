import { Gallery } from "../models/gallerySchema.js";
import { logger } from "../../logger.js";

export const getAllImagesFromGallery= async ()=>{
  try{
    const galleryImages=await Gallery.find()
    return galleryImages;
  }catch(error){
    logger.error('Error fetching all images from gallery:', error.message);
    throw new Error('Error fetching all images');
  }
}

export const deleteImageFromGallery= async(imageId)=>{
  try{
    const image=await Gallery.findByIdAndDelete(imageId)
    if(!image){
      logger.error('Image not found');
      throw new Error('Image not found')
    }
    logger.info('Image deleted successfully');
  }catch(error){
    logger.error('Error while deleting image:', error.message);
    throw new Error('Error while deleting image')
  }
}