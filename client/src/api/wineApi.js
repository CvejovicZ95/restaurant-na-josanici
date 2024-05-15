const apiUrl = process.env.API_BASE_URL;

export const getWine = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/wine`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteWine = async (id) => {
  try {
    await fetch(`${apiUrl}/api/deleteWine/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadWine = async (name, price, about, category) => {
  try {
    validateWine(name, price, category);

    const res = await fetch(`${apiUrl}/api/uploadWine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, about, category }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateWine = async (
  id,
  updatedName,
  updatedAbout,
  updatedPrice,
) => {
  try {
    await fetch(`${apiUrl}/api/updateWine/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedName,
        about: updatedAbout,
        price: updatedPrice,
      }),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateWine = (name, price, category) => {
  const validCategories = [
    "Penušava vina",
    "Bela vina",
    "Rose",
    "Crvena vina",
    "Dezertna vina",
    "Otvorena vina",
  ];

  if (!validCategories.includes(category)) {
    throw new Error("Ispravno unesite kategoriju");
  }

  if (!name || !price || !category) {
    throw new Error("Popunite sva obavezna polja");
  }
};
