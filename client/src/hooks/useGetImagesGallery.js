import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getImages, deleteImage, uploadImage } from "../api/galleryApi";

export const useGetImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const data = await getImages();
        setImages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [images]);

  const handleDeleteImage = async (id) => {
    try {
      await deleteImage(id);
      setImages((prevImages) => prevImages.filter((image) => image._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadHandler = async ({ overlayText, alt, image, category }) => {
    try {
      if (!overlayText || !alt || !image || !category) {
        throw new Error("Molimo vas popunite sva polja pre slanja slike.");
      }
      await uploadImage(overlayText, alt, image, category);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { loading, images, handleDeleteImage, uploadHandler };
};
