import config from '../config.json'
const apiUrl = config.API_BASE_URL

export const getFood = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/menu`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteFood = async (id) => {
  try {
    await fetch(`${apiUrl}/api/deleteFood/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadFood = async ({ name, price, about, category }) => {
  const validCategories = [
    'Doručak',
    'Hladna predjela',
    'Topla predjela',
    'Čorbe',
    'Paste i rižota',
    'Jela po porudžbini',
    'Roštilj',
    'Riba',
    'Obrok salate',
    'Dezert'
  ];

  if (!validCategories.includes(category)) {
    throw new Error('Ispravno unesite kategoriju');
  }

  if (!name || !price || !category) {
    throw new Error('Popunite sva obavezna polja');
  }
  
  try {
    const res = await fetch(`${apiUrl}/api/uploadFood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price, about, category })
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateFood = async (id, updatedName, updatedAbout, updatedPrice) => {
  try {
    await fetch(`${apiUrl}/api/updateFood/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ name: updatedName, about: updatedAbout, price: updatedPrice })
    });
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
