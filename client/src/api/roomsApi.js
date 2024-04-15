import config from '../config.json'
const apiUrl = config.API_BASE_URL

export const getAllRooms = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/allRooms`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateRoom = async (id, updatedName, updatedAbout, updatedPrice, updatedInfo) => {
  try {
    const res = await fetch(`${apiUrl}/api/updateRoom/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: updatedName, about: updatedAbout, price: updatedPrice, info: updatedInfo })
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};