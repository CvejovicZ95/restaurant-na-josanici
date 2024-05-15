const apiUrl = process.env.API_BASE_URL;

export const getImages = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/gallery`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteImage = async (id) => {
  try {
    await fetch(`${apiUrl}/api/gallery/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadImage = async (overlayText, alt, image, category) => {
  try {
    const formData = new FormData();
    formData.append("overlayText", overlayText);
    formData.append("alt", alt);
    formData.append("image", image);
    formData.append("category", category);

    const res = await fetch(`${apiUrl}/api/gallery`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload image to gallery");
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
